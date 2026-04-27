# 🧮 SmartCalc — Advanced Multi-Mode Calculator

## 📌 Overview
SmartCalc is a modern web-based calculator that supports **Basic, Scientific, and Programmer modes** in a single application.  
It provides real-time evaluation, keyboard support, and a clean UI with animations.

---

## 🚀 Features

### 🔢 Multi-Mode Calculator
- **Basic Mode** → Arithmetic operations (+, −, ×, ÷)
- **Scientific Mode** → sin, cos, tan, log, ln, √, π, e
- **Programmer Mode** → Binary, Decimal, Hex + Bitwise operations

### ⚡ Advanced Operations
- Floor Division (`//`)
- Modulus / Remainder (`%`)
- Power (`^`)
- Bitwise (AND, OR, XOR, NOT)

### 🎨 UI & UX
- Dark / Light theme toggle 🌙☀️  
- Smooth animations (fade, pulse, TV-on effect)  
- Responsive layout  
- Dedicated display screen behavior  

### ⌨️ Keyboard Support
- Enter → Calculate  
- Backspace → Delete  
- Direct typing supported  

### 📜 History Feature
- Stores previous calculations  
- Toggle history panel  
- Clear history  

### ⚡ Real-Time Preview
- Shows live result while typing  
- Handles invalid expressions safely  

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Math Engine:** Math.js  
- **Styling:** Custom CSS (Glassmorphism + Animations)  
- **Hosting:** GitHub Pages / Netlify  

---

## 📂 Project Structure
SmartCalc/
│
├── index.html
├── app.js
│
├── scripts/
│ ├── core/
│ │ ├── calculator.js
│ │ ├── parser.js
│ │ └── history.js
│ │
│ ├── modes/
│ │ ├── basic.js
│ │ ├── scientific.js
│ │ └── programmer.js
│ │
│ ├── ui/
│ │ ├── buttons.js
│ │ ├── display.js
│ │ └── theme.js
│ │
│ └── utils/
│ ├── helpers.js
│ └── constants.js
│
├── styles/
│ ├── base.css
│ ├── layout.css
│ ├── components.css
│ └── animations.css
│
└── config.js

---

## ⚙️ How It Works

1. User enters expression (keyboard or buttons)  
2. Input is validated and cleaned  
3. Expression is evaluated using Math.js  
4. Result is formatted and displayed  
5. Calculation is saved in history  

---

## 🔐 Safety & Validation
- Prevents invalid inputs  
- Handles errors gracefully  
- Sanitized expressions for safe evaluation  

---

## 🌐 Deployment

You can deploy using:

- GitHub Pages  
- Netlify  
- Vercel  

---

## 📈 Future Improvements

- Step-by-step solution explanation  
- Graph plotting  
- Voice input  
- Unit conversion tools  
- PWA support (offline usage)  

---

## 👨‍💻 Author

**Ram Sai**  
B.Tech AI & Computer Science Engineering  

---

## ⭐ Project Highlights

- Modular JavaScript architecture  
- Clean UI/UX design  
- Real-time computation  
- Multi-mode functionality  

---

## 📎 Live Demo

👉 https://ram310105.github.io/Smartcalc/

## 📸 Screenshots

Screenshots were presented in the assets folder
