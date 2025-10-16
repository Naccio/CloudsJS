import { default as Clouds, createCloud, drawCloud } from "./clouds.min.js";

const w = window.innerWidth;
const h = window.innerHeight;

// Static usage
const staticBgCanvas = document.getElementById('static-bg-canvas');
const staticBgContext = staticBgCanvas.getContext('2d');

staticBgCanvas.width = w;
staticBgCanvas.height = h;

const cloud = createCloud(w / 2, h / 2, w, h, 60, { r: 150, g: 150, b: 150, a: 0.4 });

staticBgContext.fillStyle = 'skyblue';
staticBgContext.fillRect(0, 0, w, h);
drawCloud(cloud, staticBgContext);

// Animated usage
const canvas = document.getElementById('canvas');
const bgCanvas = document.getElementById('bg-canvas');

canvas.width = w;
canvas.height = h;
bgCanvas.width = w;
bgCanvas.height = h;

const clouds = new Clouds(canvas);
const bgClouds = new Clouds(bgCanvas);
const bigW = w * 3 / 4;
const smallW = w * 1 / 2;
const bigH = h * 3 / 4;
const smallH = h * 1 / 2;

bgClouds.add(w / 4, h / 4, bigW, bigH, 20, { r: 120, g: 120, b: 120, a: 0.4 }, 16);
bgClouds.add(w / 3, h / 3, bigW, bigH, 30, { r: 170, g: 170, b: 170, a: 0.4 }, 8);
bgClouds.add(w * 3 / 4, h * 3 / 4, bigW, bigH, 30, { r: 180, g: 180, b: 180, a: 0.4 }, 24);

clouds.add(w * 3 / 4, h / 4, bigW, bigH, 45, { r: 200, g: 200, b: 200, a: 0.2 }, 50);
clouds.add(-w * 3 / 4, h * 3 / 4, bigW, bigH, 30, { r: 230, g: 230, b: 230, a: 0.2 }, 110);
clouds.add(-w / 2, h / 2, smallW, smallH, 40, { r: 245, g: 245, b: 245, a: 0.2 }, 80);
clouds.add(-w * 3 / 4, h / 4, smallW, smallH, 40, { r: 215, g: 215, b: 215, a: 0.2 }, 140);

// Controls
const playPause = document.getElementById('play-pause'),
    windInput = document.getElementById('wind'),
    windDisplay = document.getElementById('wind-display');

let running;

playPause.addEventListener('click', () => {
    if (running) {
        pause();
    } else {
        play();
    }
});

windInput.addEventListener('input', () => {
    const wind = windInput.value * (Math.PI / 180);

    clouds.setWindDirection(wind);
    bgClouds.setWindDirection(wind);
    windDisplay.innerText = windInput.value + '°';
});

function play() {
    bgClouds.run();
    clouds.run();
    running = true;
    playPause.innerText = 'Pause';
}

function pause() {
    bgClouds.pause();
    clouds.pause();
    running = false;
    playPause.innerText = 'Play';
}

play();