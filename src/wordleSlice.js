import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { wordList } from "random-words";
import { fetchLanguages, fetchWords } from "./services/fetchRandomWords.js";
import { languageCodeMapping } from "./keyboard/getKeyboardLayout.js";

function getFilteredWordList(length) {
    return wordList.filter((word)=>word.length===length)
}

const initialState = {
    guesses: [],
    currentGuess: "",
    maxAttempts: 6,
    wordLength: 5,
    status: "idle",
    loadingStatus: "idle",
    message: {},
    wordToGuess: "",
    darkMode: false,
    keyboardDisabled: false,
    language: "eng",
    wordList: [],
    languageList: ["eng"]
};


export const fetchWordList = createAsyncThunk(
    'wordle/fetchWordList',
    async (_, {getState, rejectWithValue}) => {
        const {language, wordLength} = getState().wordle;
        try {
            return fetchWords(language, wordLength);
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
);

export const fetchLanguageList = createAsyncThunk(
    'wordle/fetchLanguageList',
    async (_, {rejectWithValue}) => {
        try {
            const languages = await fetchLanguages();
            return languages
                .filter((code)=>languageCodeMapping[code])
                .sort((a, b) => {
                    const nameA = languageCodeMapping[a]?.toLowerCase() || "";
                    const nameB = languageCodeMapping[b]?.toLowerCase() || "";
                    return nameA.localeCompare(nameB);
                });
        } catch(err) {
            return rejectWithValue(err.message)
        }
    }
);

const wordleSlice = createSlice({
    name: "wordle",
    initialState,
    reducers: {
        clearMessage(state) {
            state.message = initialState.message;
        },
        startGame(state) {
            state.status = "playing";
            state.wordToGuess = state.wordList[Math.floor(Math.random()
                * state.wordList.length)];
        },
        updateCurrentGuess(state, action) {
            if (state.keyboardDisabled) {
                return;
            }

            if (state.status !== "playing") {
                return;
            }

            if (action.payload === "Backspace") {
                state.currentGuess = state.currentGuess.slice(0, -1);
                return;
            }

            if (action.payload && state.currentGuess.length < state.wordLength) {
                state.currentGuess += action.payload;
            }
        },
        submitCurrentGuess(state) {
            if (state.keyboardDisabled) {
                return;
            }

            if(!state.wordToGuess) {
                state.message = {message: "Still loading words", type: "error"};

                return;
            }

            if (state.status !== "playing") {
                return;
            }

            if (state.currentGuess.length !== state.wordLength) {
                console.log(state.currentGuess.length)
                console.log(state.wordLength)
                state.message = {message: "Not enough letters", type: "error"};

                return;
            }

            if (!state.wordList.includes(state.currentGuess)) {
                state.message = {message: "Not in word list", type: "error"};

                return;
            }

            state.guesses.push(state.currentGuess);
            state.currentGuess = "";

            if (state.guesses.at(-1) === state.wordToGuess) {
                state.status = "won";

                return;
            }

            if (state.guesses.length === state.maxAttempts) {
                state.status = "lost";
                state.message = {message: state.wordToGuess.toUpperCase(), type: ""};
            }
        },
        setMaxAttempts(state, action) {
            if(action.payload < 4) {
                state.maxAttempts = 4
                return
            } else if (action.payload > 8) {
                state.maxAttempts = 8
                return
            }
            state.maxAttempts = action.payload;
        },
        setWordLength(state, action) {
            if(action.payload < 2) {
                state.wordLength = 2
                return
            } else if (action.payload > 8) {
                state.wordLength = 8
                return
            }
            state.wordLength = action.payload;
        },
        setDarkMode(state, action) {
            state.darkMode = action.payload;
        },
        setKeyboardDisabled(state, action) {
            state.keyboardDisabled = action.payload;
        },
        setLanguage(state, action) {
            if(state.languageList.includes(action.payload))
                state.language = action.payload
        },
        resetGame(state) {
            return {
                ...initialState,
                message: {message: "Game has been reset", type: "reset"},
                darkMode: state.darkMode,
                languageList: state.languageList,
                language: state.language,
                wordLength: state.wordLength,
                maxAttempts: state.maxAttempts,
                wordList: state.wordList
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWordList.pending, (state) => {
                state.message = {message: "Loading", type: "loading"};
            })
            .addCase(fetchWordList.fulfilled, (state, action) => {
                if (action.payload) {
                    state.wordList = action.payload;
                }
                state.loadingStatus = 'idle';
            })
            .addCase(fetchWordList.rejected, (state) => {
                state.wordList = getFilteredWordList(state.wordLength);

                state.language = initialState.language;
                state.languageList = initialState.languageList
            })
            .addCase(fetchLanguageList.pending, (state) => {
                state.message = {message: "Loading", type: "loading"};
            })
            .addCase(fetchLanguageList.fulfilled, (state, action) => {
                if (action.payload) {
                    state.languageList = action.payload;
                }
            })
            .addCase(fetchLanguageList.rejected, (state) => {
                state.languageList = initialState.languageList
            });
    }
});

export const getGuesses = (state) => state.wordle.guesses;
export const getCurrentGuess = (state) => state.wordle.currentGuess;
export const getMaxAttempts = (state) => state.wordle.maxAttempts;
export const getWordLength = (state) => state.wordle.wordLength;
export const getStatus = (state) => state.wordle.status;
export const getWordToGuess = (state) => state.wordle.wordToGuess;
export const getMessage = (state) => state.wordle.message;
export const getIsDarkMode = (state) => state.wordle.darkMode;
export const getLanguage = (state) => state.wordle.language
export const getLanguageList = (state) => state.wordle.languageList

export const startGameAndFetch = () => async (dispatch, getState) => {
    const { languageList } = getState().wordle
    if(languageList.length <= 1) {
        await dispatch(fetchLanguageList());
    }
    await dispatch(fetchWordList());
    dispatch({ type: "wordle/startGame" });
}

export const updateWordLength = (length) => (dispatch) => {
    dispatch({ type: "wordle/resetGame" });
    dispatch({ type: "wordle/setWordLength", payload: Number(length) });
    dispatch(startGameAndFetch());
};

export const updateMaxAttempts = (attempts) => (dispatch) => {
    dispatch({ type: "wordle/resetGame" });
    dispatch({ type: "wordle/setMaxAttempts", payload: Number(attempts) });
    dispatch({ type: "wordle/startGame" });
};

export const updateLanguage = (language) => (dispatch) => {
    dispatch({ type: "wordle/resetGame" });
    dispatch({ type: "wordle/setLanguage", payload: language });
    dispatch(startGameAndFetch());
};

export const {
    clearMessage,
    updateCurrentGuess,
    submitCurrentGuess,
    setDarkMode,
    setKeyboardDisabled,
    setWordLength,
    setMaxAttempts,
    setLanguage
} = wordleSlice.actions;

export default wordleSlice.reducer;
