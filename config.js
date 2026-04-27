// ===== APP CONFIGURATION =====
export const CONFIG = {

  // ===== THEME =====
  theme: {
    default: "dark",
    storageKey: "theme"
  },

  // ===== HISTORY =====
  history: {
    maxItems: 20,
    storageKey: "calc_history"
  },

  // ===== CALCULATOR =====
  calculator: {
    maxDecimals: 10,
    allowPreview: true,
    allowKeyboardInput: true,

    // 🔥 NEW (useful for your power system)
    requirePowerOn: true
  },

  // ===== MODES =====
  modes: {
    default: "basic",
    list: ["basic", "scientific", "programmer"]
  },

  // ===== UI SETTINGS =====
  ui: {
    animationDuration: 200, // ms (more practical than 0.2)
    enableSound: false,
    enableVibration: false,
    enableHistoryPanel: true,

    // 🔥 NEW
    bootText: "SmartCalc",
    enableBootAnimation: true
  },

  // ===== FEATURE FLAGS =====
  features: {
    explainMode: false,
    advancedHistory: true,
    voiceInput: false // 🔥 future upgrade
  }

};