"use server";

type PartOfSpeech = "N" | "V" | "Adj";

const getRandomWord = async (lang: string = "eng", min_freq?: number, min_len?: number, max_len?: number, pos?: PartOfSpeech) => {
  return ""
}

const getWordList = async (lang: string = "eng", min_freq?: number, min_len?: number, max_len?: number, pos?: PartOfSpeech, max_index?: number) => {
  return []
}

const getLanguages = async (pos: PartOfSpeech) => {
  return []
}

export { getLanguages, getRandomWord, getWordList }