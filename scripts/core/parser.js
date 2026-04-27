import { cleanInput, formatResult, limitDecimals } from "../utils/helpers.js";
import { CONFIG } from "../../config.js";


// ===== INTERNAL EVALUATION PIPELINE =====
function processExpression(exp) {
  let safeExp = cleanInput(exp);

  // 🔥 FLOOR DIVISION SUPPORT (//)
  // Converts: a // b → floor(a / b)
  safeExp = safeExp.replace(/(\d+)\s*\/\/\s*(\d+)/g, "floor($1 / $2)");

  // (Optional improvement: handle nested expressions later if needed)

  let result = math.evaluate(safeExp);

  result = limitDecimals(result, CONFIG.calculator.maxDecimals);

  return result;
}


// ===== MAIN EVALUATOR (FOR "=" BUTTON) =====
export function evaluateExpression(exp) {
  try {
    if (!exp || exp.trim() === "") return "";

    const result = processExpression(exp);

    return formatResult(result);

  } catch {
    return "Error";
  }
}


// ===== LIVE PREVIEW =====
export function previewExpression(exp) {
  try {
    if (!exp || exp.trim() === "") return "";

    return processExpression(exp);

  } catch {
    return "";
  }
}


// ===== VALIDATION =====
export function isValidExpression(exp) {
  try {
    if (!exp) return false;

    let safeExp = cleanInput(exp);

    // apply same transformation for validation
    safeExp = safeExp.replace(/(\d+)\s*\/\/\s*(\d+)/g, "floor($1 / $2)");

    math.parse(safeExp);

    return true;

  } catch {
    return false;
  }
}


// ===== SAFE EVALUATION (STRICT MODE) =====
export function safeEvaluate(exp) {
  try {
    if (!exp) return "Error";

    let safeExp = cleanInput(exp);

    // 🔥 SECURITY CHECK
    if (/[^0-9+\-*/().^%a-zA-Z]/.test(safeExp)) {
      return "Error";
    }

    // 🔥 FLOOR DIVISION SUPPORT
    safeExp = safeExp.replace(/(\d+)\s*\/\/\s*(\d+)/g, "floor($1 / $2)");

    const result = processExpression(safeExp);

    return formatResult(result);

  } catch {
    return "Error";
  }
}