import { OPERATORS, SPECIAL_KEYS } from "../utils/constants.js";

export const basicButtons = [
  "7","8","9","/",
  "4","5","6","*",
  "1","2","3","-",
  "0",".","=","+",
  "//","%", // 🔥 NEW
  SPECIAL_KEYS.CLEAR,
  SPECIAL_KEYS.BACKSPACE
];


// ===== HANDLE INPUT =====
export function handleBasicInput(value, currentInput) {

  // ===== CLEAR =====
  if (value === SPECIAL_KEYS.CLEAR) {
    return "";
  }

  // ===== BACKSPACE =====
  if (value === SPECIAL_KEYS.BACKSPACE) {
    return currentInput.slice(0, -1);
  }

  // ===== EQUALS =====
  if (value === SPECIAL_KEYS.EQUALS) {
    return currentInput;
  }

  // ===== FLOOR DIVISION (//) =====
  if (value === "//") {
    const lastChar = currentInput.slice(-1);

    // avoid invalid cases like: 5+// or ////
    if (!currentInput || OPERATORS.includes(lastChar)) {
      return currentInput;
    }

    return currentInput + "//";
  }

  // ===== REMAINDER (%) =====
  if (value === "%") {
    const lastChar = currentInput.slice(-1);

    if (!currentInput || OPERATORS.includes(lastChar)) {
      return currentInput;
    }

    return currentInput + "%";
  }

  // ===== PREVENT DOUBLE OPERATORS =====
  if (OPERATORS.includes(value)) {
    const lastChar = currentInput.slice(-1);

    if (OPERATORS.includes(lastChar)) {
      return currentInput.slice(0, -1) + value;
    }
  }

  // ===== PREVENT MULTIPLE DECIMALS =====
  if (value === ".") {
    const parts = currentInput.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];

    if (lastPart.includes(".")) {
      return currentInput;
    }
  }

  return currentInput + value;
}