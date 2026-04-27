import { CONFIG } from "../../config.js";

let history = JSON.parse(localStorage.getItem(CONFIG.history.storageKey)) || [];


// ===== ADD HISTORY =====
export function addHistory(exp, res) {
  if (!exp || res === "Error") return;

  // prevent duplicate consecutive entries
  if (history.length && history[0].exp === exp && history[0].res === res) {
    return;
  }

  const item = { exp, res };

  history.unshift(item);

  // limit history size (from config)
  if (history.length > CONFIG.history.maxItems) {
    history.pop();
  }

  saveHistory();
  renderHistory();
}


// ===== SAVE =====
function saveHistory() {
  localStorage.setItem(CONFIG.history.storageKey, JSON.stringify(history));
}


// ===== RENDER =====
export function renderHistory() {
  const historyList = document.getElementById("historyList");
  if (!historyList) return;

  historyList.innerHTML = "";

  if (history.length === 0) {
    historyList.innerHTML = `<li class="empty">No history yet</li>`;
    return;
  }

  history.forEach((item) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="history-item">
        <span class="exp">${item.exp}</span>
        <span class="res">= ${item.res}</span>
      </div>
    `;

    // click to reuse
    li.addEventListener("click", () => {
      const input = document.getElementById("input");
      if (input) input.value = item.exp;
    });

    historyList.appendChild(li);
  });
}


// ===== CLEAR HISTORY =====
export function clearHistory() {
  history = [];
  saveHistory();
  renderHistory();
}