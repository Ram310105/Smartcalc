import { CONFIG } from "../../config.js";


// ===== SAFE ELEMENT GETTERS =====
function getBody() {
  return document.body;
}

function getThemeBtn() {
  return document.getElementById("themeToggle");
}


// ===== INIT THEME =====
export function initTheme() {
  const body = getBody();

  const savedTheme = localStorage.getItem(CONFIG.theme.storageKey);

  const theme = savedTheme || CONFIG.theme.default;

  applyTheme(theme);
}


// ===== TOGGLE THEME =====
export function toggleTheme() {
  const body = getBody();

  const isLight = body.classList.toggle("light");

  const newTheme = isLight ? "light" : "dark";

  localStorage.setItem(CONFIG.theme.storageKey, newTheme);

  updateIcon(newTheme);
}


// ===== APPLY THEME =====
function applyTheme(theme) {
  const body = getBody();

  if (theme === "light") {
    body.classList.add("light");
  } else {
    body.classList.remove("light");
  }

  updateIcon(theme);
}


// ===== UPDATE ICON =====
function updateIcon(mode) {
  const themeBtn = getThemeBtn();
  if (!themeBtn) return;

  themeBtn.innerText = mode === "light" ? "☀️" : "🌙";
}