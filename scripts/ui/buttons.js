import { basicButtons } from "../modes/basic.js";
import { scientificButtons } from "../modes/scientific.js";
import { programmerButtons } from "../modes/programmer.js";

import { CONFIG } from "../../config.js";

let currentMode = CONFIG.modes.default;


// ===== SET MODE =====
export function setMode(mode) {
  if (!CONFIG.modes.list.includes(mode)) return;

  currentMode = mode;

  renderButtons();
  updateActiveModeUI();
}


// ===== GET MODE =====
export function getMode() {
  return currentMode;
}


// ===== RENDER BUTTONS =====
export function renderButtons() {
  const container = document.getElementById("buttons");
  if (!container) return;

  container.innerHTML = "";

  let btns;

  if (currentMode === "scientific") btns = scientificButtons;
  else if (currentMode === "programmer") btns = programmerButtons;
  else btns = basicButtons;

  btns.forEach(b => {
    const btn = document.createElement("button");

    btn.innerText = b;
    btn.dataset.value = b;

    // styling classes
    if (["+", "-", "*", "/", "="].includes(b)) {
      btn.classList.add("operator");
    }

    if (b === "C") {
      btn.classList.add("clear");
    }

    if (b === "=") {
      btn.classList.add("equals");
    }

    container.appendChild(btn);
  });
}


// ===== MODE SWITCHER =====
export function initModeSwitcher() {
  const modeButtons = document.querySelectorAll(".modes button");

  modeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.mode;
      setMode(mode);
    });
  });

  updateActiveModeUI();
}


// ===== ACTIVE BUTTON UI =====
function updateActiveModeUI() {
  const modeButtons = document.querySelectorAll(".modes button");

  modeButtons.forEach(btn => {
    if (btn.dataset.mode === currentMode) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}