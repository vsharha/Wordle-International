"use server";

import GraphemeSplitter from "grapheme-splitter";

type PartOfSpeech = "N" | "V" | "Adj";

const splitter = new GraphemeSplitter()

const getRandomWord = async (lang: string = "eng", min_freq?: number, min_len?: number, max_len?: number, pos?: PartOfSpeech) => {
  return ""
}

const isInWordList = async (word: string) => {
  return false
}

const getLanguages = async (pos: PartOfSpeech) => {
  return []
}

export { getLanguages, getRandomWord, isInWordList }