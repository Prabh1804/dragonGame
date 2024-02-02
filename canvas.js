import "./components/terrain.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let deltaTime = 1;
let prevTimestamp = 0;

const step = (timestamp) => {
  deltaTime = prevTimestamp - timestamp;
  prevTimestamp = timestamp;
  // terrain(ctx, deltaTime);
  setTimeout(() => {canvas.requestAnimationFrame(step)}, 100);
};

canvas.requestAnimationFrame(step);
