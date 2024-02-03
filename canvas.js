
import {terrain, generateTerrain, terrainPointsY} from "./components/terrain.js";
import {initEnemies, tickEnemies} from "./components/enemies.js";
import {initDragon, tickDragon} from "./components/dragon.js"
const speed = 0.0005;
window.addEventListener("load", () => {

  let loading = document.querySelector(".loading");
  loading.style.display="none";
  
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  let deltaTime = 1;
  let prevTimestamp = 0;
  
  initDragon();
function handleWindowResize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  window.addEventListener("resize", handleWindowResize);

  generateTerrain(ctx.canvas.width / ctx.canvas.height);
  initEnemies(ctx, ctx.canvas.width / ctx.canvas.height);
  function animate(timestamp){
  
    let terrainposY = terrainPointsY[4];
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    tickDragon();
    deltaTime = timestamp - prevTimestamp;
    prevTimestamp = performance.now();
    terrain(ctx, deltaTime, speed);
    tickEnemies(ctx, deltaTime, speed);
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 1/60);
  }
  animate(0);
});


