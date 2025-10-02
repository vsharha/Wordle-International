import { createSlice } from "@reduxjs/toolkit";
import { generate, wordList } from "random-words";

const initialState = {
    guesses: [],
    currentGuess: "",
    maxAttempts: 6,
    wordLength: 5,
    status: "idle",
    message: "",
    messageType: "",
    wordToGuess: "",
    darkMode: false,
    keyboardDisabled: false,
    language: "eng"
};

const wordleSlice = createSlice({
    name: "wordle",
    initialState,
    reducers: {
        clearMessage(state) {
            state.message = "";
            state.messageType = "";
        },
        startGame(state) {
            state.wordToGuess = generate({
                minLength: state.wordLength,
                maxLength: state.wordLength,
            });
            state.status = "playing";
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
                return;
            }
        },
        submitCurrentGuess(state) {
            if (state.keyboardDisabled) {
                return;
            }

            if (state.status !== "playing") {
                return;
            }

            if (state.currentGuess.length !== state.wordLength) {
                state.message = "Not enough letters";
                state.messageType = "error";

                return;
            }

            if (!wordList.includes(state.currentGuess)) {
                state.message = "Not in word list";
                state.messageType = "error";

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
                state.message = state.wordToGuess.toUpperCase();

                return;
            }
        },
        setMaxAttempts(state, action) {
            state.maxAttempts = action.payload;
        },
        setWordLength(state, action) {
            state.wordLength = action.payload;
        },
        setDarkMode(state, action) {
            state.darkMode = action.payload;
        },
        setKeyboardDisabled(state, action) {
            state.keyboardDisabled = action.payload;
        },
        setLanguage(state, action) {
            state.language = action.payload
        },
        resetGame(state) {
            return {
                ...initialState,
                message: "Game has been reset",
                messageType: "reset",
                darkMode: state.darkMode,
                wordLength: state.wordLength,
                maxAttempts: state.maxAttempts,
                language: state.language
            };
        },
    },
});

export const getGuesses = (state) => state.wordle.guesses;
export const getCurrentGuess = (state) => state.wordle.currentGuess;
export const getMaxAttempts = (state) => state.wordle.maxAttempts;
export const getWordLength = (state) => state.wordle.wordLength;
export const getStatus = (state) => state.wordle.status;
export const getWordToGuess = (state) => state.wordle.wordToGuess;
export const getMessage = (state) => state.wordle.message;
export const getMessageType = (state) => state.wordle.messageType;
export const getIsDarkMode = (state) => state.wordle.darkMode;
export const getLanguage = (state) => state.wordle.language

export const updateWordLength = (length) => (dispatch) => {
    dispatch({ type: "wordle/resetGame" });
    dispatch({ type: "wordle/setWordLength", payload: Number(length) });
    dispatch({ type: "wordle/startGame" });
};

export const updateMaxAttempts = (attempts) => (dispatch) => {
    dispatch({ type: "wordle/resetGame" });
    dispatch({ type: "wordle/setMaxAttempts", payload: Number(attempts) });
    dispatch({ type: "wordle/startGame" });
};

export const updateLanguage = (language) => (dispatch) => {
    dispatch({ type: "wordle/resetGame" });
    dispatch({ type: "wordle/setLanguage", payload: Number(language) });
    dispatch({ type: "wordle/startGame" });
};

export const {
    clearMessage,
    startGame,
    updateCurrentGuess,
    submitCurrentGuess,
    setDarkMode,
    setKeyboardDisabled,
} = wordleSlice.actions;

export default wordleSlice.reducer;
