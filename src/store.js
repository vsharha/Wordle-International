import { configureStore } from "@reduxjs/toolkit";
import wordleSlice from "./wordleSlice.js";

const store = configureStore({
    reducer: {
        wordle: wordleSlice,
    },
});

export default store;
