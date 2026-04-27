import { evaluateExpression, previewExpression } from "./parser.js";
import { updateDisplay, showPreview, clearDisplay, bindEnterKey } from "../ui/display.js";
import { addHistory } from "./history.js";

import { handleBasicInput } from "../modes/basic.js";
import { handleScientificInput, evaluateScientific } from "../modes/scientific.js";
import { handleProgrammerInput, evaluateProgrammer } from "../modes/programmer.js";

import { getMode } from "../ui/buttons.js";
import { CONFIG } from "../../config.js";

export function initCalculator() {

  const buttons = document.getElementById("buttons");
  const input = document.getElementById("input");

  if (!buttons || !input) return;

  // ===== BUTTON CLICK HANDLER =====
  buttons.addEventListener("click", (e) => {
    const val = e.target?.dataset?.value;
    if (!val) return;

    const mode = getMode();

    // ===== EVALUATE ("=") =====
    if (val === "=") {
      const result = evaluateByMode(mode, input.value);

      updateDisplay(result);

      // avoid saving errors / empty
      if (result !== "Error" && input.value.trim() !== "") {
        addHistory(input.value, result);
      }

      return;
    }

    // ===== CLEAR =====
    if (val === "C") {
      clearDisplay();
      return;
    }

    // ===== BACKSPACE =====
    if (val === "⌫") {
      input.value = input.value.slice(0, -1);
      handlePreview(mode, input.value);
      return;
    }

    // ===== INPUT HANDLING =====
    input.value = handleInputByMode(mode, val, input.value);

    // ===== LIVE PREVIEW =====
    handlePreview(mode, input.value);
  });


  // ===== LIVE PREVIEW ON TYPING =====
  input.addEventListener("input", () => {
    const mode = getMode();
    handlePreview(mode, input.value);
  });


  // ===== ENTER KEY SUPPORT =====
  bindEnterKey((value) => {
    const mode = getMode();
    const result = evaluateByMode(mode, value);

    updateDisplay(result);

    if (result !== "Error" && value.trim() !== "") {
      addHistory(value, result);
    }
  });
}


// ===== HELPER: MODE BASED INPUT =====
function handleInputByMode(mode, val, current) {
  if (mode === "scientific") {
    return handleScientificInput(val, current);
  }

  if (mode === "programmer") {
    return handleProgrammerInput(val, current);
  }

  return handleBasicInput(val, current);
}


// ===== HELPER: MODE BASED EVALUATION =====
function evaluateByMode(mode, value) {
  if (mode === "scientific") {
    return evaluateScientific(value);
  }

  if (mode === "programmer") {
    return evaluateProgrammer(value);
  }

  return evaluateExpression(value);
}


// ===== HELPER: PREVIEW CONTROL =====
function handlePreview(mode, value) {
  if (!CONFIG.calculator.allowPreview) return;

  if (mode !== "programmer") {
    const preview = previewExpression(value);
    showPreview(preview);
  }
}