import { OPERATORS, SPECIAL_KEYS, FUNCTIONS } from "../utils/constants.js";
import { cleanInput, limitDecimals, formatResult } from "../utils/helpers.js";
import { CONFIG } from "../../config.js";

export const scientificButtons = [
  "sin","cos","tan","log",
  "ln","sqrt","^","π",
  "(",")","%","//",   // 🔥 UPDATED
  "7","8","9","*",
  "4","5","6","-",
  "1","2","3","+",
  "0",".","=",
  SPECIAL_KEYS.CLEAR,
  SPECIAL_KEYS.BACKSPACE,
  "e"
];


// ===== HANDLE INPUT =====
export function handleScientificInput(value, currentInput) {

  // CLEAR
  if (value === SPECIAL_KEYS.CLEAR) return "";

  // BACKSPACE
  if (value === SPECIAL_KEYS.BACKSPACE) {
    return currentInput.slice(0, -1);
  }

  // EQUALS handled outside
  if (value === SPECIAL_KEYS.EQUALS) return currentInput;

  // CONSTANTS
  if (value === "π") return currentInput + "pi";
  if (value === "e") return currentInput + "e";

  // FUNCTIONS
  if (FUNCTIONS.includes(value)) {
    return currentInput + value + "(";
  }

  // POWER
  if (value === "^") return currentInput + "^";

  // ===== FLOOR DIVISION =====
  if (value === "//") {
    const lastChar = currentInput.slice(-1);

    if (!currentInput || OPERATORS.includes(lastChar)) {
      return currentInput;
    }

    return currentInput + "//";
  }

  // ===== REMAINDER =====
  if (value === "%") {
    const lastChar = currentInput.slice(-1);

    if (!currentInput || OPERATORS.includes(lastChar)) {
      return currentInput;
    }

    return currentInput + "%";
  }

  // PREVENT DOUBLE OPERATORS
  if (OPERATORS.includes(value)) {
    const lastChar = currentInput.slice(-1);
    if (OPERATORS.includes(lastChar)) {
      return currentInput.slice(0, -1) + value;
    }
  }

  // PREVENT MULTIPLE DECIMALS
  if (value === ".") {
    const parts = currentInput.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];

    if (lastPart.includes(".")) return currentInput;
  }

  return currentInput + value;
}


// ===== INTERNAL PROCESS =====
function processScientific(exp) {
  let safeExp = cleanInput(exp);

  // 🔥 FLOOR DIVISION SUPPORT
  safeExp = safeExp.replace(/(\d+)\s*\/\/\s*(\d+)/g, "floor($1 / $2)");

  let result = math.evaluate(safeExp);

  result = limitDecimals(result, CONFIG.calculator.maxDecimals);

  return result;
}


// ===== EVALUATION =====
export function evaluateScientific(exp) {
  try {
    if (!exp || exp.trim() === "") return "";

    const result = processScientific(exp);

    return formatResult(result);

  } catch {
    return "Error";
  }
}