import "./components/terrain.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let deltaTime = 1;
let prevTimestamp = 0;

const step = (timestamp) => {
  deltaTime = timestamp - prevTimestamp;
  prevTimestamp = timestamp;
  requestAnimationFrame(step);
}
 function animate(){
	prevTimestamp = performance.now();
	requestAnimationFrame(step);
 }
animate();
