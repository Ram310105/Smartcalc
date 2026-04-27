import { SPECIAL_KEYS } from "../utils/constants.js";

export const programmerButtons = [
  "A","B","C","D",
  "E","F","(",")",
  "7","8","9","/",
  "4","5","6","*",
  "1","2","3","-",
  "0",".","=","+",
  "AND","OR","XOR","NOT",
  "BIN","DEC","HEX",
  SPECIAL_KEYS.CLEAR,
  SPECIAL_KEYS.BACKSPACE
];

let currentBase = "DEC";


// ===== BASE CONVERSION =====
export function convertBase(value, base) {
  try {
    if (!value) return "";

    let num;

    if (currentBase === "BIN") num = parseInt(value, 2);
    else if (currentBase === "HEX") num = parseInt(value, 16);
    else num = parseInt(value, 10);

    if (isNaN(num)) return "Error";

    if (base === "BIN") return num.toString(2);
    if (base === "HEX") return num.toString(16).toUpperCase();

    return num.toString(10);

  } catch {
    return "Error";
  }
}


// ===== HANDLE INPUT =====
export function handleProgrammerInput(value, currentInput) {

  // CLEAR
  if (value === SPECIAL_KEYS.CLEAR) return "";

  // BACKSPACE
  if (value === SPECIAL_KEYS.BACKSPACE) {
    return currentInput.slice(0, -1);
  }

  // CHANGE BASE
  if (["BIN","DEC","HEX"].includes(value)) {
    currentBase = value;
    return convertBase(currentInput, value);
  }

  // LOGICAL OPERATORS
  if (value === "AND") return currentInput + "&";
  if (value === "OR") return currentInput + "|";
  if (value === "XOR") return currentInput + "^";
  if (value === "NOT") return "~" + currentInput;

  // EQUALS (handled outside)
  if (value === "=") return currentInput;

  return currentInput + value;
}


// ===== SAFE EVALUATION =====
export function evaluateProgrammer(exp) {
  try {
    if (!exp) return "";

    // replace bitwise symbols (already mapped)
    let safeExp = exp;

    // use Function instead of eval (safer scope)
    let result = Function(`"use strict"; return (${safeExp})`)();

    if (result === undefined || isNaN(result)) return "Error";

    return convertBase(result.toString(), currentBase);

  } catch {
    return "Error";
  }
}