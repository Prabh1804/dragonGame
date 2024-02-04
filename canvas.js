
import {terrain, generateTerrain} from "./components/terrain.js";
import {initEnemies, tickEnemies, tickBullets, destroyEnemies} from "./components/enemies.js";
import {initDragon, tickDragon, heart, setScore, setHealth} from "./components/dragon.js"
import {Screen} from "./components/startScreen.js";

export let shouldShowStartScreen = true;
export let shouldShowEndScreen = false;
export let isGameRunning = false;
export const showEndScreen = () => {
  shouldShowEndScreen = true;
  destroyEnemies();
  isGameRunning = false;
}

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
// (headingFont, buttonFont, text, buttonText, onClick)  
  const startScreen = new Screen("72px 'Pixelify Sans'", "50px 'Pixelify Sans'", 9, "dragonGame", "Play!", (button) => {
    button.destroy();
    shouldShowStartScreen = false;
    isGameRunning = true;
    initEnemies(ctx, ctx.canvas.width / ctx.canvas.height);
  })

  const endScreen = new Screen("72px 'Pixelify Sans'", "100px 'Pixelify Sans'", 30, "", "↺", (button) => {
    button.destroy();
    shouldShowEndScreen = false;
    isGameRunning = true;
    setScore(0);
    setHealth(5);
    initEnemies(ctx, ctx.canvas.width / ctx.canvas.height);
  })
  function animate(timestamp){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    tickDragon();
    deltaTime = timestamp - prevTimestamp;
    prevTimestamp = performance.now();
    terrain(ctx, deltaTime, speed);
    tickEnemies(ctx, deltaTime, speed);
    tickBullets(ctx, deltaTime);
    if (shouldShowStartScreen) {
      startScreen.drawScreen(ctx);
    }
    if (shouldShowEndScreen) {
      endScreen.drawScreen(ctx);
    }
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 1/60);
  }
  animate(0);
});


