<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=00e5ff&height=200&section=header&text=Disquizz%20🚀&fontSize=90&fontColor=ffffff&animation=fadeIn" alt="Header Banner">
</div>

<h1 align="center">
  <span style="color: #66fcf1">D</span><span style="color: #45a29e">i</span><span style="color: #c5c6c7">s</span><span style="color: #8A2387">q</span><span style="color: #E94057">u</span><span style="color: #F27121">i</span><span style="color: #00e5ff">z</span><span style="color: #66fcf1">z</span> 🎮
</h1>

<p align="center">
  <em>¡Demuestra tu conocimiento con este increíble y dinámico juego de trivia web!</em>
</p>

<div align="center">
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
</div>

---

## 🌟 <span style="color: #00e5ff">Características Principales</span>

- 🎨 **Glassmorphism Design:** Una UI premium que incluye transparencias, luces de neón y fondos dinámicos.
- 📱 **Mobile-Friendly & QR Ready:** Viene con un código QR integrado para que tus amigos o alumnos lo escaneen y jueguen desde sus teléfonos de inmediato.
- 🧠 **40 Preguntas Aleatorias:** Selecciona dinámicamente preguntas desde la base de datos para que cada partida sea única.
- ⚡ **Automatización en Python:** Extrae preguntas y detecta *mágicamente* las respuestas correctas desde un archivo Excel analizando el color verde de las celdas usando `openpyxl`.

---

## 🚀 <span style="color: #E94057">Estructura del Proyecto</span>

```text
QUIZZ/
├── 🐍 extract_quiz.py     # Script que parsea el Excel a JSON
├── 🐍 extract_format.py   # Script exploratorio de formato
├── 📊 quiz.json           # Base de datos final de preguntas extraída
└── ⚛️ app/                # Frontend en React + Vite
    ├── src/App.tsx        # Lógica del Quiz, Router y animaciones
    ├── src/index.css      # Estilos Glassmorphism Vanilla CSS
    └── src/data/quiz.json # Data lista para ser consumida
```

---

## 🛠️ <span style="color: #F27121">Cómo usarlo en tu máquina</span>

### 1. Extracción de Preguntas (Python)
Si necesitas actualizar las preguntas en el archivo de Excel (`Disquizz - Preguntas.xlsx`):
```bash
source venv/bin/activate
python extract_quiz.py
cp quiz.json app/src/data/
```

### 2. Levantar el Frontend (React)
```bash
cd app
npm install
npm run dev
```
Luego simplemente visita `http://localhost:5173` 🚀

---

## 🌐 <span style="color: #8A2387">Despliegue</span>

El proyecto está diseñado para funcionar de manera "plug-and-play" en **Vercel**.
Solo debes correr el comando oficial de Vercel desde dentro de la carpeta `app`:

```bash
cd app
npx vercel
```

---

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=00e5ff&height=100&section=footer" width="100%">
  <p>Construido con ❤️ por <strong>Angemon</strong></p>
</div>
