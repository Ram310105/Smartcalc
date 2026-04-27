import { initCalculator } from "./scripts/core/calculator.js";
import { renderButtons, initModeSwitcher } from "./scripts/ui/buttons.js";
import { initTheme, toggleTheme } from "./scripts/ui/theme.js";
import { renderHistory, clearHistory } from "./scripts/core/history.js";

function getEl(id) {
  return document.getElementById(id);
}

document.addEventListener("DOMContentLoaded", () => {

  const app = getEl("app");
  const powerBtn = getEl("powerBtn");
  const result = getEl("result");
  const input = getEl("input");
  const display = document.querySelector(".display");

  let isOn = false;

  // ===== START OFF =====
  if (app) app.classList.add("off");


  // ===== POWER BUTTON =====
  powerBtn?.addEventListener("click", () => {

    if (!isOn) {
      isOn = true;

      app.classList.add("off");

      // ===== STEP 1: TV FLASH =====
      display.classList.add("tv-on");

      setTimeout(() => {
        display.classList.remove("tv-on");

        // ===== STEP 2: TEXT =====
        result.innerText = "SmartCalc";
        result.classList.add("cinematic");

        setTimeout(() => {
          result.classList.remove("cinematic");
          result.innerText = "";

          // ===== STEP 3: ENABLE APP =====
          app.classList.remove("off");

          // 🔥 IMPORTANT FIX
          input?.focus();

        }, 1000);

      }, 400);

      powerBtn.style.background = "#22c55e";

    } else {
      // ===== TURN OFF =====
      isOn = false;

      app.classList.add("off");

      result.innerText = "";
      if (input) input.value = "";

      powerBtn.style.background = "#ef4444";
    }

  });


  // ===== CORE =====
  renderButtons();
  initCalculator();
  initModeSwitcher();


  // ===== THEME =====
  initTheme();

  const themeBtn = getEl("themeToggle");
  themeBtn?.addEventListener("click", toggleTheme);


  // ===== HISTORY =====
  renderHistory();

  const historyBtn = getEl("historyToggle");
  const historyPanel = getEl("historyPanel");

  historyBtn?.addEventListener("click", () => {
    historyPanel?.classList.toggle("hidden");
  });

  const clearBtn = getEl("clearHistory");
  clearBtn?.addEventListener("click", clearHistory);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      historyPanel?.classList.add("hidden");
    }
  });


  // ===== KEYBOARD SUPPORT =====
  input?.addEventListener("keydown", (e) => {

    if (!isOn) {
      e.preventDefault();
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      document.querySelector('[data-value="="]')?.click();
    }

  });


  // 🔥 CLICK ANYWHERE → KEEP INPUT ACTIVE
  document.addEventListener("click", () => {
    if (isOn) input?.focus();
  });

});