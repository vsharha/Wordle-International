"use server";

import fs from "fs/promises";
import path from "path";
import GraphemeSplitter from "grapheme-splitter";

type PartOfSpeech = "N" | "V" | "ADJ";

const splitter = new GraphemeSplitter();

const datasetsCache: Map<string, Map<string, number>> = new Map();

async function loadDataset(lang: string, pos: PartOfSpeech): Promise<Map<string, number>> {
  const cacheKey = `${lang}-${pos}`;

  if (datasetsCache.has(cacheKey)) {
    return datasetsCache.get(cacheKey)!;
  }

  const datasetPath = path.join(process.cwd(), "src", "actions", "datasets", lang, pos);

  try {
    const content = await fs.readFile(datasetPath, "utf-8");
    const wordFreqMap = new Map<string, number>();

    const lines = content.trim().split("\n");
    for (const line of lines) {
      const [word, freqStr] = line.split("\t");
      if (word && freqStr) {
        wordFreqMap.set(word, parseInt(freqStr, 10));
      }
    }

    datasetsCache.set(cacheKey, wordFreqMap);
    return wordFreqMap;
  } catch (error) {
    return new Map();
  }
}

async function datasetExists(lang: string, pos: PartOfSpeech): Promise<boolean> {
  const datasetPath = path.join(process.cwd(), "src", "actions", "datasets", lang, pos);
  try {
    await fs.access(datasetPath);
    return true;
  } catch {
    return false;
  }
}

function filterWords(
  wordFreqMap: Map<string, number>,
  options: {
    minFreq?: number;
    maxLen?: number;
    minLen?: number;
    maxIndex?: number;
  } = {}
): string[] {
  const { minFreq, maxLen, minLen, maxIndex } = options;

  let words = Array.from(wordFreqMap.entries());
  words.sort((a, b) => b[1] - a[1]);

  if (minFreq !== undefined) {
    words = words.filter(([_, freq]) => freq >= minFreq);
  }

  if (minLen !== undefined) {
    words = words.filter(([word]) => splitter.splitGraphemes(word).length >= minLen);
  }

  if (maxLen !== undefined) {
    words = words.filter(([word]) => splitter.splitGraphemes(word).length <= maxLen);
  }

  if (maxIndex !== undefined) {
    words = words.slice(0, maxIndex);
  }

  return words.map(([word]) => word);
}

/**
 * Get a random word based on filters
 */
const getRandomWord = async (
  lang: string = "eng",
  wordLength?: number,
  minFreq?: number,
  pos: PartOfSpeech = "N"
): Promise<string> => {
  const exists = await datasetExists(lang, pos);
  if (!exists) {
    throw new Error(`Dataset not found for language: ${lang}, part of speech: ${pos}`);
  }

  const wordFreqMap = await loadDataset(lang, pos);

  const words = filterWords(wordFreqMap, {
    minFreq,
    minLen: wordLength,
    maxLen: wordLength,
  });

  if (words.length === 0) {
    throw new Error(`No words found matching criteria for ${lang}`);
  }

  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

/**
 * Get list of words based on filters
 */
const getWordList = async (
  lang: string = "eng",
  wordLength?: number,
  minFreq?: number,
  maxIndex?: number,
  pos: PartOfSpeech = "N"

): Promise<string[]> => {
  const exists = await datasetExists(lang, pos);
  if (!exists) {
    throw new Error(`Dataset not found for language: ${lang}, part of speech: ${pos}`);
  }

  const wordFreqMap = await loadDataset(lang, pos);

  const words = filterWords(wordFreqMap, {
    minFreq,
    minLen: wordLength,
    maxLen: wordLength,
    maxIndex,
  });

  return words;
};

/**
 * Check if a word exists in the word list
 */
const isInWordList = async (
  word: string,
  lang: string = "eng",
  wordLength?: number,
  pos: PartOfSpeech = "N"
): Promise<boolean> => {
  try {
    const words = await getWordList(lang, wordLength, undefined, undefined, pos);
    const wordLower = word.toLowerCase();
    return words.some((dictWord) => dictWord.toLowerCase() === wordLower);
  } catch (error) {
    console.error("Error checking word list:", error);
    return false;
  }
};

/**
 * Get list of available languages for a given part of speech
 */
const getLanguages = async (pos: PartOfSpeech = "N"): Promise<string[]> => {
  const datasetsDir = path.join(process.cwd(), "src", "actions", "datasets");

  try {
    const entries = await fs.readdir(datasetsDir, { withFileTypes: true });
    const languages: string[] = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const lang = entry.name;
        const hasPos = await datasetExists(lang, pos);
        if (hasPos) {
          languages.push(lang);
        }
      }
    }

    return languages.sort();
  } catch (error) {
    console.error("Error reading languages:", error);
    return [];
  }
};

export { getLanguages, getRandomWord, getWordList, isInWordList };
export type { PartOfSpeech };
