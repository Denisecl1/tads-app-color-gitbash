// Referencias a sliders y inputs
const redRange = document.getElementById("redRange");
const greenRange = document.getElementById("greenRange");
const blueRange = document.getElementById("blueRange");

const redInput = document.getElementById("redInput");
const greenInput = document.getElementById("greenInput");
const blueInput = document.getElementById("blueInput");

const rgbInput = document.getElementById("rgbInput"); // nuevo

const colorBox = document.getElementById("colorBox");
const hexCode = document.getElementById("hexCode");

// 🎶 Cargar sonido
function playSound() {
  const audio = new Audio("sounds/click.mp3"); 
  audio.currentTime = 0; // reinicia para que se escuche aunque muevas rápido
  audio.play();
}


// Función para actualizar el color
function updateColor() {
  const r = parseInt(redRange.value);
  const g = parseInt(greenRange.value);
  const b = parseInt(blueRange.value);

  redInput.value = r;
  greenInput.value = g;
  blueInput.value = b;
  rgbInput.value = `${r},${g},${b}`;

  const rgbColor = `rgb(${r}, ${g}, ${b})`;
  const hexColor = "#" + 
    r.toString(16).padStart(2, "0") + 
    g.toString(16).padStart(2, "0") + 
    b.toString(16).padStart(2, "0");

  colorBox.style.background = rgbColor;
  hexCode.textContent = hexColor.toUpperCase();

  playSound();
}

// Función para actualizar desde inputs numéricos
function updateFromInput() {
  const r = parseInt(redInput.value) || 0;
  const g = parseInt(greenInput.value) || 0;
  const b = parseInt(blueInput.value) || 0;

  redRange.value = Math.min(Math.max(r, 0), 255);
  greenRange.value = Math.min(Math.max(g, 0), 255);
  blueRange.value = Math.min(Math.max(b, 0), 255);

  updateColor();
}

// Función para actualizar desde input RGB directo
function updateFromRGB() {
  const values = rgbInput.value.split(",").map(v => parseInt(v.trim()));
  if (values.length === 3 && values.every(v => !isNaN(v) && v >= 0 && v <= 255)) {
    redRange.value = values[0];
    greenRange.value = values[1];
    blueRange.value = values[2];
    updateColor();
  }
}

// Eventos sliders
redRange.addEventListener("input", updateColor);
greenRange.addEventListener("input", updateColor);
blueRange.addEventListener("input", updateColor);

// Eventos inputs numéricos
redInput.addEventListener("input", updateFromInput);
greenInput.addEventListener("input", updateFromInput);
blueInput.addEventListener("input", updateFromInput);

// Evento input RGB
rgbInput.addEventListener("input", updateFromRGB);

// Inicializar
updateColor();

// 📋 Copiar código HEX al portapapeles
const copyBtn = document.getElementById("copyBtn");
const copyMsg = document.getElementById("copyMsg");

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(hexCode.textContent).then(() => {
    copyMsg.style.display = "block";
    setTimeout(() => copyMsg.style.display = "none", 1500);
  });
});

// 🔄 Reiniciar valores
const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {
  redRange.value = 0;
  greenRange.value = 0;
  blueRange.value = 0;

  redInput.value = 0;
  greenInput.value = 0;
  blueInput.value = 0;
  rgbInput.value = "0,0,0";

  updateColor();
});
