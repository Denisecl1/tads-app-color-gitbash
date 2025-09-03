// 🔗 Referencias a sliders (barras de rango) y a inputs de valores numéricos
const redRange = document.getElementById("redRange");   // Slider del color Rojo
const greenRange = document.getElementById("greenRange"); // Slider del color Verde
const blueRange = document.getElementById("blueRange");  // Slider del color Azul

const redInput = document.getElementById("redInput");   // Input numérico del Rojo
const greenInput = document.getElementById("greenInput"); // Input numérico del Verde
const blueInput = document.getElementById("blueInput");  // Input numérico del Azul

const rgbInput = document.getElementById("rgbInput"); // Input para escribir el RGB directo (ejemplo: "255,120,60")

const colorBox = document.getElementById("colorBox"); // Caja que muestra el color
const hexCode = document.getElementById("hexCode");   // Texto que muestra el código HEX del color

// 🎶 Función para reproducir un sonido cada vez que se actualiza el color
function playSound() {
  const audio = new Audio("sounds/click.mp3"); // Carga el archivo de sonido
  audio.currentTime = 0; // Reinicia el audio para que se escuche aunque se dispare varias veces seguidas
  audio.play(); // Reproduce el sonido
}

// 🎨 Función principal para actualizar el color mostrado
function updateColor() {
  // Obtiene los valores de los sliders (rojo, verde, azul) y los convierte a enteros
  const r = parseInt(redRange.value);
  const g = parseInt(greenRange.value);
  const b = parseInt(blueRange.value);

  // Refleja esos valores en los inputs numéricos
  redInput.value = r;
  greenInput.value = g;
  blueInput.value = b;

  // También actualiza el input de texto con el formato RGB
  rgbInput.value = `${r},${g},${b}`;

  // Construye el color en formato rgb() y hexadecimal
  const rgbColor = `rgb(${r}, ${g}, ${b})`;
  const hexColor = "#" + 
    r.toString(16).padStart(2, "0") + // Convierte rojo a HEX (2 dígitos)
    g.toString(16).padStart(2, "0") + // Convierte verde a HEX
    b.toString(16).padStart(2, "0");  // Convierte azul a HEX

  // Aplica el color como fondo en la caja de muestra
  colorBox.style.background = rgbColor;
  // Muestra el código HEX en mayúsculas
  hexCode.textContent = hexColor.toUpperCase();

  // Llama a la función para reproducir sonido
  playSound();
}

// 🔢 Función para actualizar el color a partir de los inputs numéricos
function updateFromInput() {
  // Lee los valores escritos en los inputs (si está vacío, toma 0)
  const r = parseInt(redInput.value) || 0;
  const g = parseInt(greenInput.value) || 0;
  const b = parseInt(blueInput.value) || 0;

  // Ajusta los valores al rango válido (0–255)
  redRange.value = Math.min(Math.max(r, 0), 255);
  greenRange.value = Math.min(Math.max(g, 0), 255);
  blueRange.value = Math.min(Math.max(b, 0), 255);

  // Llama a la función de actualización de color
  updateColor();
}

// 🎯 Función para actualizar el color desde el input de texto RGB
function updateFromRGB() {
  // Divide el texto en 3 valores separados por coma y los convierte en enteros
  const values = rgbInput.value.split(",").map(v => parseInt(v.trim()));
  
  // Valida que haya exactamente 3 valores y que estén en el rango 0–255
  if (values.length === 3 && values.every(v => !isNaN(v) && v >= 0 && v <= 255)) {
    // Asigna los valores a los sliders
    redRange.value = values[0];
    greenRange.value = values[1];
    blueRange.value = values[2];
    // Actualiza el color
    updateColor();
  }
}

// 🎚️ Eventos para detectar movimiento en los sliders
redRange.addEventListener("input", updateColor);
greenRange.addEventListener("input", updateColor);
blueRange.addEventListener("input", updateColor);

// 📥 Eventos para detectar cambios en los inputs numéricos
redInput.addEventListener("input", updateFromInput);
greenInput.addEventListener("input", updateFromInput);
blueInput.addEventListener("input", updateFromInput);

// 🎨 Evento para detectar cuando se escribe un valor en el input RGB
rgbInput.addEventListener("input", updateFromRGB);

// 🔄 Llama una primera vez para inicializar con valores por defecto
updateColor();

// 📋 Funcionalidad para copiar el código HEX al portapapeles
const copyBtn = document.getElementById("copyBtn"); // Botón de copiar
const copyMsg = document.getElementById("copyMsg"); // Mensaje de "copiado"

copyBtn.addEventListener("click", () => {
  // Copia el texto del código HEX
  navigator.clipboard.writeText(hexCode.textContent).then(() => {
    // Muestra el mensaje de confirmación
    copyMsg.style.display = "block";
    // Oculta el mensaje después de 1.5 segundos
    setTimeout(() => copyMsg.style.display = "none", 1500);
  });
});

// 🔄 Funcionalidad para reiniciar todos los valores a cero
const resetBtn = document.getElementById("resetBtn"); // Botón de reinicio

resetBtn.addEventListener("click", () => {
  // Restablece sliders
  redRange.value = 0;
  greenRange.value = 0;
  blueRange.value = 0;

  // Restablece inputs numéricos
  redInput.value = 0;
  greenInput.value = 0;
  blueInput.value = 0;

  // Restablece input de RGB
  rgbInput.value = "0,0,0";

  // Actualiza el color mostrado
  updateColor();
});
