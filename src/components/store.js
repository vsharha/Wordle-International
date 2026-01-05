import { configureStore } from "@reduxjs/toolkit";
import wordleSlice from "@/components/wordleSlice.js";

const store = configureStore({
    reducer: {
        wordle: wordleSlice,
    },
});

export default store;
