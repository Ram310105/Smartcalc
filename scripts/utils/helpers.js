import { OPERATORS } from "./constants.js";
import { CONFIG } from "../../config.js";


// ===== CHECK NUMBER =====
export function isNumber(val) {
  return typeof val !== "boolean" && val !== "" && !isNaN(val);
}


// ===== CHECK OPERATOR =====
export function isOperator(val) {
  return OPERATORS.includes(val);
}


// ===== SAFE PARSE =====
export function safeParse(val) {
  try {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  } catch {
    return 0;
  }
}


// ===== CLEAN INPUT =====
export function cleanInput(input) {
  if (!input) return "";

  // allow letters for functions like sin, cos, log, etc.
  return input.replace(/[^0-9+\-*/().^%a-zA-Z]/g, "");
}


// ===== FORMAT RESULT =====
export function formatResult(val) {
  if (val === "" || val === null || val === undefined) return "";

  if (isNumber(val)) {
    return Number(val).toLocaleString("en-IN", {
      maximumFractionDigits: CONFIG.calculator.maxDecimals
    });
  }

  return val;
}


// ===== LIMIT DECIMALS =====
export function limitDecimals(val, limit = CONFIG.calculator.maxDecimals) {
  if (isNumber(val)) {
    return Number(parseFloat(val).toFixed(limit));
  }
  return val;
}