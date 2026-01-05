"use client";

import GraphemeSplitter from "grapheme-splitter";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { languageCodeMapping } from "@/components/keyboard/getKeyboardLayout.js";
import {
  getLanguages,
  getRandomWord,
  isInWordList,
} from "@/actions/randomWords";

const splitter = new GraphemeSplitter();

const initialState = {
  guesses: [],
  currentGuess: "",
  maxAttempts: 6,
  wordLength: 5,
  status: "playing",
  message: {},
  wordToGuess: "",
  darkMode: false,
  keyboardDisabled: false,
  language: "eng",
  wordLoadingStatus: "idle",
  languageLoadingStatus: "idle",
  wordLoadingRequestId: undefined,
  languageList: ["eng"],
};

export const fetchRandomWord = createAsyncThunk(
  "wordle/fetchRandomWord",
  async (_, { getState, rejectWithValue }) => {
    const { language, wordLength } = getState()["wordle"];
    try {
      return await getRandomWord(language, wordLength);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchLanguageList = createAsyncThunk(
  "wordle/fetchLanguageList",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { currentLanguages } = getState()["wordle"];
      if (currentLanguages) {
        return currentLanguages;
      }

      const languages = await getLanguages();
      return languages
        .filter((code) => languageCodeMapping[code])
        .sort((a, b) => {
          const nameA = languageCodeMapping[a]?.toLowerCase() || "";
          const nameB = languageCodeMapping[b]?.toLowerCase() || "";
          return nameA.localeCompare(nameB);
        });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const validateAndSubmitGuess = createAsyncThunk(
  "wordle/validateAndSubmitGuess",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState().wordle;
    const {
      currentGuess,
      wordLength,
      language,
      status,
      keyboardDisabled,
      wordToGuess,
    } = state;

    // Check if keyboard is disabled
    if (keyboardDisabled) {
      return rejectWithValue("Keyboard is disabled");
    }

    // Check if word is loaded
    if (!wordToGuess) {
      return rejectWithValue("Still loading words");
    }

    // Check if game is still playing
    if (status !== "playing") {
      return rejectWithValue("Game is not in playing state");
    }

    // Check word length
    if (splitter.splitGraphemes(currentGuess).length !== wordLength) {
      return rejectWithValue("Not enough letters");
    }

    // Validate word with server action
    try {
      const isValid = await isInWordList(currentGuess, language, wordLength);
      if (!isValid) {
        return rejectWithValue("Not in word list");
      }

      // If validation passes, submit the guess
      dispatch(submitCurrentGuess());
      return currentGuess;
    } catch (err) {
      return rejectWithValue("Failed to validate word");
    }
  },
);

const wordleSlice = createSlice({
  name: "wordle",
  initialState,
  reducers: {
    clearMessage(state) {
      state.message = initialState.message;
    },
    startGame(state, action) {
      state.status = "playing";
      if (action.payload) {
        state.wordToGuess = action.payload;
      }
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

      if (
        action.payload &&
        splitter.splitGraphemes(state.currentGuess).length < state.wordLength
      ) {
        state.currentGuess += action.payload;
      }
    },
    submitCurrentGuess(state) {
      // This reducer should only be called after validation passes
      // Use validateAndSubmitGuess thunk for user-initiated submissions
      state.guesses.push(state.currentGuess);
      state.currentGuess = "";

      if (
        state.guesses.at(-1).toLowerCase() === state.wordToGuess.toLowerCase()
      ) {
        state.status = "won";

        return;
      }

      if (state.guesses.length === state.maxAttempts) {
        state.status = "lost";
        state.message = {
          message: state.wordToGuess.toUpperCase(),
          type: "lost",
        };
      }
    },
    setMaxAttempts(state, action) {
      if (action.payload < 4) {
        state.maxAttempts = 4;
        return;
      } else if (action.payload > 8) {
        state.maxAttempts = 8;
        return;
      }
      state.maxAttempts = action.payload;
    },
    setWordLength(state, action) {
      if (action.payload < 2) {
        state.wordLength = 2;
        return;
      } else if (action.payload > 8) {
        state.wordLength = 8;
        return;
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
      if (
        !Object.keys(languageCodeMapping).includes(action.payload.toLowerCase())
      ) {
        state.language = initialState.language;
        return;
      }
      state.language = action.payload.toLowerCase();
    },
    resetGame(state) {
      return {
        ...initialState,
        // message: {message: "Game has been reset", type: "reset"},
        darkMode: state.darkMode,
        languageList: state.languageList,
        language: state.language,
        wordLength: state.wordLength,
        maxAttempts: state.maxAttempts,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomWord.pending, (state, action) => {
        state.wordLoadingStatus = "loading";
        state.wordLoadingRequestId = action.meta.requestId;
      })
      .addCase(fetchRandomWord.fulfilled, (state, action) => {
        if (state.wordLoadingRequestId !== action.meta.requestId) return;

        if (action.payload) {
          state.wordToGuess = action.payload;
          state.status = "playing";
        }
        state.wordLoadingStatus = "idle";
        state.wordLoadingRequestId = undefined;
      })
      .addCase(fetchRandomWord.rejected, (state, action) => {
        if (state.wordLoadingRequestId !== action.meta.requestId) return;

        state.wordToGuess = "";
        state.message = { message: "Failed to load word", type: "error" };

        state.wordLoadingStatus = "failed";
        state.wordLoadingRequestId = undefined;
      })
      .addCase(fetchLanguageList.pending, (state) => {
        state.languageLoadingStatus = "loading";
      })
      .addCase(fetchLanguageList.fulfilled, (state, action) => {
        if (action.payload) {
          state.languageList = action.payload;

          if (state.languageList.includes(state.language.toLowerCase())) {
            state.language = state.language.toLowerCase();
          } else {
            state.language = initialState.language;
          }

          state.languageLoadingStatus = "idle";
        }
      })
      .addCase(fetchLanguageList.rejected, (state) => {
        state.languageList = initialState.languageList;
        state.language = initialState.language;

        state.languageLoadingStatus = "failed";
      })
      .addCase(validateAndSubmitGuess.rejected, (state, action) => {
        // Show error message when validation fails
        state.message = { message: action.payload, type: "error" };
      });
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
export const getLanguage = (state) => state.wordle.language;
export const getLanguageList = (state) => state.wordle.languageList;
export const getLanguageLoadingStatus = (state) =>
  state.wordle.languageLoadingStatus;
export const getWordLoadingStatus = (state) => state.wordle.wordLoadingStatus;

export const startGameAndFetch = () => async (dispatch, getState) => {
  const { languageList } = getState().wordle;
  if (languageList === initialState.languageList) {
    await dispatch(fetchLanguageList());
  }
  await dispatch(fetchRandomWord());
};

export const updateWordLength = (length) => (dispatch) => {
  dispatch({ type: "wordle/resetGame" });
  dispatch({ type: "wordle/setWordLength", payload: Number(length) });
  dispatch(startGameAndFetch());
};

export const updateMaxAttempts = (attempts) => async (dispatch) => {
  dispatch({ type: "wordle/resetGame" });
  dispatch({ type: "wordle/setMaxAttempts", payload: Number(attempts) });
  await dispatch(fetchRandomWord());
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
  setLanguage,
  startGame,
  resetGame,
} = wordleSlice.actions;

export default wordleSlice.reducer;
