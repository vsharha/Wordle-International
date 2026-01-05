import arabic from "simple-keyboard-layouts/build/layouts/arabic";
import armenianEastern from "simple-keyboard-layouts/build/layouts/armenianEastern";
import bengali from "simple-keyboard-layouts/build/layouts/bengali";
import czech from "simple-keyboard-layouts/build/layouts/czech";
import english from "simple-keyboard-layouts/build/layouts/english";
import georgian from "simple-keyboard-layouts/build/layouts/georgian";
import german from "simple-keyboard-layouts/build/layouts/german";
import greek from "simple-keyboard-layouts/build/layouts/greek";
import hebrew from "simple-keyboard-layouts/build/layouts/hebrew";
import hungarian from "simple-keyboard-layouts/build/layouts/hungarian";
import korean from "simple-keyboard-layouts/build/layouts/korean";
import macedonian from "simple-keyboard-layouts/build/layouts/macedonian";
import polish from "simple-keyboard-layouts/build/layouts/polish";
import russian from "simple-keyboard-layouts/build/layouts/russian";
import spanish from "simple-keyboard-layouts/build/layouts/spanish";
import swedish from "simple-keyboard-layouts/build/layouts/swedish";
import telugu from "simple-keyboard-layouts/build/layouts/telugu";
import turkish from "simple-keyboard-layouts/build/layouts/turkish";
import ukrainian from "simple-keyboard-layouts/build/layouts/ukrainian";
import urdu from "simple-keyboard-layouts/build/layouts/urdu";

const keyboardLayouts = {
  ara: arabic,
  ben: bengali,
  ces: czech,
  deu: german,
  ell: greek,
  eng: english,
  heb: hebrew,
  hun: hungarian,
  hye: armenianEastern,
  kat: georgian,
  kor: korean,
  mkd: macedonian,
  pol: polish,
  rus: russian,
  spa: spanish,
  swe: swedish,
  tel: telugu,
  tur: turkish,
  ukr: ukrainian,
  urd: urdu,
};

const languageCodeMapping = {
  ara: "arabic",
  ben: "bengali",
  ces: "czech",
  deu: "german",
  ell: "greek",
  eng: "english",
  heb: "hebrew",
  hun: "hungarian",
  hye: "armenian",
  kat: "georgian",
  kor: "korean",
  mkd: "macedonian",
  pol: "polish",
  rus: "russian",
  spa: "spanish",
  swe: "swedish",
  tel: "telugu",
  tur: "turkish",
  ukr: "ukrainian",
  urd: "urdu",
};

function isAllowedKey(key, lang) {
  return (
    key.length === 1 &&
    !key.startsWith("{") &&
    !key.endsWith("}") &&
    !/^[\d+\-=[\]\\;,./~!@#$%^&*()_{}|:"<>?§¥€¿«»'„՝‌،؛˛¤·₴№÷×`°¡]+$/.test(
      key,
    ) &&
    !/^[٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹،؛؟٪؍۔܃״٫ـًٌٍَُِّْٰٓٔ]+$/.test(key) &&
    !/^[ءئؤإأآ'"]$/.test(key) &&
    !/^[՛՜՞և]$/.test(key) &&
    !(lang === "heb" && /^[A-Za-z]$/.test(key))
  );
}

export default function getKeyboardLayout(lang) {
  const layout = keyboardLayouts[lang].layout;
  const defaultKeys = layout.default
    .map((line_str) => line_str.split(" "))
    .map((line) => line.filter((key) => isAllowedKey(key, lang)));

  const shiftKeys = layout.shift
    ? layout.shift
        .map((line_str) => line_str.split(" "))
        .map((line) => line.filter((key) => isAllowedKey(key, lang)))
    : [];

  let processedLayout = [];

  for (let i = 0; i < defaultKeys.length; i++) {
    const defaultLine = defaultKeys[i];
    const shiftLine = shiftKeys[i] || [];

    // Add shift row with only keys not in default row
    const shiftOnlyKeys = shiftLine.filter(
      (key) => !defaultLine.some((k) => k.toLowerCase() === key.toLowerCase()),
    );

    if (shiftOnlyKeys.length > 0) {
      processedLayout.push(shiftOnlyKeys);
    }

    // Add default (non-shift) row
    if (defaultLine.length > 0) {
      processedLayout.push(defaultLine);
    }
  }

  if (processedLayout.length === 0) {
    return null;
  }

  processedLayout.at(-1).unshift("Enter");
  processedLayout.at(-1).push("Backspace");

  console.log(processedLayout);
  return processedLayout;
}

export function getNormalizedLayout(lang) {
  const layout = getKeyboardLayout(lang);

  let normalized = [];

  for (let line of layout) {
    let row = [];

    for (const letter of line) {
      row.push({ letter: letter, width: letter.length > 1 ? 1.5 : 1 });
    }

    normalized.push(row);
  }

  const longest = Math.max(
    ...normalized.map((line) =>
      line.reduce((total, current) => total + current.width, 0),
    ),
  );

  for (let line of normalized) {
    const totalWidth = line.reduce(
      (total, current) => total + current.width,
      0,
    );

    for (let needed = longest - totalWidth; needed > 0; needed -= 2) {
      if (needed === 1) {
        line.unshift({ width: 0.5 });
        line.push({ width: 0.5 });
      } else {
        line.unshift({ width: 1 });
        line.push({ width: 1 });
      }
    }
  }

  return normalized;
}

export function getFlattenedLayout(lang) {
  return getKeyboardLayout(lang).reduce((accumulator, current) =>
    accumulator.concat(current),
  );
}

export { keyboardLayouts, languageCodeMapping };
