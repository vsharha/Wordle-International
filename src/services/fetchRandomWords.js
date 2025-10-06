const BASE_URL = "https://random-words-intl.onrender.com/"
// const BASE_URL = "http://localhost:8000/"

export async function fetchWords(lang, length, max_index=10000, pos="N") {
    const response = await fetch(BASE_URL + `words?lang=${lang}&min_len=${length}&max_len=${length}&max_index=${max_index}&pos=${pos}`)
    const data = await response.json()

    return data.words
}

export async function fetchLanguages(pos="N") {
    const response = await fetch(BASE_URL + `languages?pos=${pos}`)
    const data = await response.json()

    return data.languages
}