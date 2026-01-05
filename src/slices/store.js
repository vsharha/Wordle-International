"use client";

import { configureStore } from "@reduxjs/toolkit";
import wordleSlice from "@/slices/wordleSlice.js";

const store = configureStore({
    reducer: {
        wordle: wordleSlice,
    },
});

export default store;
