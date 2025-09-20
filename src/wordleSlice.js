import { createSlice } from "@reduxjs/toolkit";
import { generate, wordList } from "random-words";

const initialState = {
    guesses: [],
    currentGuess: "",
    maxAttempts: 6,
    wordLength: 5,
    status: "idle",
    message: "",
    wordToGuess: "",
    darkMode: true,
    keyboardDisabled: false,
};

const wordleSlice = createSlice({
    name: "wordle",
    initialState,
    reducers: {
        clearMessage(state) {
            state.message = "";
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
            if (state.status !== "playing") {
                return;
            }

            if (state.currentGuess.length !== state.wordLength) {
                state.message = "Not enough letters";

                return;
            }

            if (!wordList.includes(state.currentGuess)) {
                state.message = "Not in word list";

                return;
            }

            state.guesses.push(state.currentGuess);
            state.currentGuess = "";

            if (state.currentGuess === state.wordToGuess) {
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
        reset(state) {
            return {
                ...initialState,
                message: "Game has been reset",
                wordLength: state.wordLength,
                maxAttempts: state.maxAttempts,
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
export const getIsDarkMode = (state) => state.wordle.darkMode;

export const updateWordLength = (length) => (dispatch) => {
    dispatch({ type: "wordle/reset" });
    dispatch({ type: "wordle/setWordLength", payload: Number(length) });
    dispatch({ type: "wordle/startGame" });
};

export const updateMaxAttempts = (attempts) => (dispatch) => {
    dispatch({ type: "wordle/reset" });
    dispatch({ type: "wordle/setMaxAttempts", payload: Number(attempts) });
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
