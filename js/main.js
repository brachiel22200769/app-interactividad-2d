document.body.style.backgroundColor = "#121212";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.justifyContent = "flex-start";
document.body.style.alignItems = "center";
document.body.style.height = "100vh";
document.body.style.margin = "0";
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.paddingTop = "10px";

const title = document.createElement("h1");
title.innerText = "Juego de Rayos Mcqueen";
title.style.fontSize = "28px";
title.style.fontWeight = "bold";
title.style.color = "#FFD700";
title.style.textShadow = "2px 2px 4px #FF4500";
title.style.marginBottom = "5px";
document.body.appendChild(title);

const levelCounter = document.createElement("h2");
levelCounter.innerText = "Nivel: 1";
levelCounter.style.color = "white";
levelCounter.style.fontSize = "20px";
document.body.appendChild(levelCounter);

const circleCounter = document.createElement("h2");
circleCounter.innerText = "Yayos restantes: 10";
circleCounter.style.color = "white";
circleCounter.style.fontSize = "20px";
document.body.appendChild(circleCounter);

const theCanvas = document.createElement("canvas");
const ctx = theCanvas.getContext("2d");
theCanvas.width = 900;
theCanvas.height = 800;
theCanvas.style.border = "5px solid #FFD700";
theCanvas.style.borderRadius = "15px";
theCanvas.style.boxShadow = "0 0 20px rgba(255, 215, 0, 0.8)";
theCanvas.style.background = "#1E1E1E";
theCanvas.style.cursor = "pointer";
document.body.appendChild(theCanvas);

const startButton = document.createElement("button");
startButton.innerText = "Start";
startButton.style.padding = "15px 30px";
startButton.style.margin = "10px";
startButton.style.fontSize = "18px";
startButton.style.backgroundColor = "#28a745";
startButton.style.color = "white";
startButton.style.border = "none";
startButton.style.borderRadius = "10px";
startButton.style.cursor = "pointer";
document.body.appendChild(startButton);

const resetButton = document.createElement("button");
resetButton.innerText = "RESTART";
resetButton.style.padding = "15px 30px";
resetButton.style.margin = "10px";
resetButton.style.fontSize = "18px";
resetButton.style.backgroundColor = "#dc3545";
resetButton.style.color = "white";
resetButton.style.border = "none";
resetButton.style.borderRadius = "10px";
resetButton.style.cursor = "pointer";
resetButton.style.position = "absolute";
resetButton.style.top = "50%";
resetButton.style.left = "50%";
resetButton.style.transform = "translate(-50%, -50%)";
resetButton.style.display = "none";
document.body.appendChild(resetButton);

let objects = [];
let level = 1;
let maxLevels = 10;
let playing = false;

const image = new Image();
image.src = "descarga.jpg"; // Asegúrate de que la imagen esté en la misma carpeta que el script

class GameObject {
    constructor(x, y, size, speed) {
        this.posX = x;
        this.posY = y;
        this.size = size;
        this.dy = -speed;
    }
    draw(context) {
        context.drawImage(image, this.posX, this.posY, this.size, this.size);
    }
    update(context) {
        this.draw(context);
        this.posY += this.dy;
    }
}

theCanvas.addEventListener("click", (event) => {
    if (!playing) return;
    const rect = theCanvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    objects = objects.filter(obj => {
        return !(mouseX > obj.posX && mouseX < obj.posX + obj.size && mouseY > obj.posY && mouseY < obj.posY + obj.size);
    });
    circleCounter.innerText = `Yayos restantes: ${objects.length}`;
    if (objects.length === 0) {
        if (level < maxLevels) {
            level++;
            startLevel();
        } else {
            playing = false;
            resetButton.style.display = "block";
        }
    }
});

function startLevel() {
    objects = [];
    for (let i = 0; i < 10; i++) {
        let size = Math.floor(Math.random() * 60) + 40;
        let x = Math.random() * (theCanvas.width - size);
        let y = theCanvas.height + size;
        let speed = 0.5 + level * 0.2;
        objects.push(new GameObject(x, y, size, speed));
    }
    levelCounter.innerText = `Nivel: ${level}`;
    circleCounter.innerText = "Yayos restantes: 10";
}

function updateObjects() {
    if (!playing) return;
    requestAnimationFrame(updateObjects);
    ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
    objects.forEach(obj => obj.update(ctx));
    objects = objects.filter(obj => obj.posY + obj.size > 0);
    circleCounter.innerText = `Yayos restantes: ${objects.length}`;
    if (objects.length > 0 && objects.every(obj => obj.posY + obj.size <= 0)) {
        playing = false;
        alert("Perdiste. Intenta de nuevo.");
        resetButton.style.display = "block";
    }
}

startButton.addEventListener("click", () => {
    level = 1;
    playing = true;
    startButton.style.display = "none";
    resetButton.style.display = "none";
    startLevel();
    updateObjects();
});

resetButton.addEventListener("click", () => {
    level = 1;
    playing = false;
    objects = [];
    resetButton.style.display = "none";
    startButton.style.display = "block";
    ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
    levelCounter.innerText = "Nivel: 1";
    circleCounter.innerText = "Yayos restantes: 10";
});
