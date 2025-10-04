// import arabic from "simple-keyboard-layouts/build/layouts/arabic"
// import farsi from "simple-keyboard-layouts/build/layouts/farsi"
// import urdu from "simple-keyboard-layouts/build/layouts/urdu"
// import hindi from "simple-keyboard-layouts/build/layouts/hindi"

import english from "simple-keyboard-layouts/build/layouts/english"
// import bengali from "simple-keyboard-layouts/build/layouts/bengali"
import brazilian from "simple-keyboard-layouts/build/layouts/brazilian"
import czech from "simple-keyboard-layouts/build/layouts/czech"
import french from "simple-keyboard-layouts/build/layouts/french"
import german from "simple-keyboard-layouts/build/layouts/german"
import greek from "simple-keyboard-layouts/build/layouts/greek"
import hebrew from "simple-keyboard-layouts/build/layouts/hebrew"
import hungarian from "simple-keyboard-layouts/build/layouts/hungarian"
import italian from "simple-keyboard-layouts/build/layouts/italian"
import japanese from "simple-keyboard-layouts/build/layouts/japanese"
import korean from "simple-keyboard-layouts/build/layouts/korean"
import macedonian from "simple-keyboard-layouts/build/layouts/macedonian"
import polish from "simple-keyboard-layouts/build/layouts/polish"
import russian from "simple-keyboard-layouts/build/layouts/russian"
import spanish from "simple-keyboard-layouts/build/layouts/spanish"
import swedish from "simple-keyboard-layouts/build/layouts/swedish"
import telugu from "simple-keyboard-layouts/build/layouts/telugu"
import turkish from "simple-keyboard-layouts/build/layouts/turkish"
import ukrainian from "simple-keyboard-layouts/build/layouts/ukrainian"
import georgian from "simple-keyboard-layouts/build/layouts/georgian"
import armenianEastern from "simple-keyboard-layouts/build/layouts/armenianEastern"

const keyboardLayouts = {
    // arabic: arabic,
    // farsi: farsi,
    // urdu: urdu,
    // hindi: hindi,
    english: english,
    // bengali: bengali,
    portuguese: brazilian,
    czech: czech,
    french: french,
    german: german,
    greek: greek,
    hebrew: hebrew,
    hungarian: hungarian,
    italian: italian,
    japanese: japanese,
    korean: korean,
    macedonian: macedonian,
    polish: polish,
    russian: russian,
    spanish: spanish,
    swedish: swedish,
    telugu: telugu,
    turkish: turkish,
    ukrainian: ukrainian,
    georgian: georgian,
    armenian: armenianEastern
};

function isAllowedKey(key) {
    return key.length === 1 &&
        !key.startsWith("{") &&
        !key.endsWith("}") &&
        !/^[\d+\-=[\]\\;,./`~!@#$%^&*()_{}|:"<>?´¨˛°§¥€¿«»'„՝՛‌،؛゛゜]+$/.test(key) &&
        !/^[\u0300-\u036F\u0900-\u097F\u0600-\u06FF]$/.test(key)
}

export default function getKeyboardLayout(lang) {
    let processedLayout = keyboardLayouts[lang].layout.default
        .map((line_str) => line_str.split(" "))
        .map((line) => line.filter((key) => isAllowedKey(key)))
        .filter(line=>line.length>0);

    if(processedLayout.length === 0) {
        return null
    }

    processedLayout.at(-1).unshift("Enter")
    processedLayout.at(-1).push("Backspace")

    return processedLayout;
}

export {keyboardLayouts}