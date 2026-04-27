import { formatResult } from "../utils/helpers.js";
import { CONFIG } from "../../config.js";


// ===== SAFE ELEMENT GETTERS =====
function getInputEl() {
  return document.getElementById("input");
}

function getResultEl() {
  return document.getElementById("result");
}


// ===== UPDATE FINAL RESULT =====
export function updateDisplay(value) {
  const resultEl = getResultEl();
  if (!resultEl) return;

  if (value === "Error") {
    resultEl.innerText = "Error";
    resultEl.style.color = "#ef4444";
    resultEl.style.opacity = 1;
    animate(resultEl);
    return;
  }

  resultEl.innerText = formatResult(value);
  resultEl.style.color = "#38bdf8";
  resultEl.style.opacity = 1;

  animate(resultEl);
}


// ===== SHOW LIVE PREVIEW =====
export function showPreview(value) {
  const resultEl = getResultEl();
  if (!resultEl) return;

  if (value === "" || value === undefined) {
    resultEl.innerText = "";
    return;
  }

  resultEl.innerText = value;
  resultEl.style.color = "#94a3b8";
  resultEl.style.opacity = 0.7;
}


// ===== CLEAR DISPLAY =====
export function clearDisplay() {
  const inputEl = getInputEl();
  const resultEl = getResultEl();

  if (inputEl) inputEl.value = "";
  if (resultEl) resultEl.innerText = "";
}


// ===== UPDATE INPUT =====
export function updateInput(value) {
  const inputEl = getInputEl();
  if (inputEl) inputEl.value = value;
}


// ===== ANIMATION =====
function animate(el) {
  if (!el) return;

  el.classList.remove("fade");
  void el.offsetWidth;
  el.classList.add("fade");
}


// ===== ENTER KEY SUPPORT =====
export function bindEnterKey(callback) {
  const inputEl = getInputEl();
  if (!inputEl) return;

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      callback(inputEl.value);
    }
  });
}