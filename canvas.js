
import {terrain, generateTerrain, terrainPointsY} from "./components/terrain.js";
import {initEnemies, tickEnemies} from "./components/enemies.js";

const speed = 0.0005;
window.addEventListener("load", () => {

  let loading = document.querySelector(".loading");
  loading.style.display="none";
  
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let dragonVelocity = 0;
  let dragonVelocityX = 0;
  let isDragonDive = false;
  let isDragonDash = false;
  
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  let deltaTime = 1;
  let prevTimestamp = 0;
  let dragonX = 0;
  let dragonY = 0;
function dragon(){	
	ctx.strokeStyle="white";
	ctx.lineWidth = 5;
	ctx.strokeRect(dragonX,dragonY,100,100);
}

  const canvasResizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      ctx.canvas.width  = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, ctx.width, ctx.height);
    }
  });
  canvasResizeObserver.observe(canvas);

  generateTerrain(ctx.canvas.width / ctx.canvas.height);
  initEnemies(ctx, ctx.canvas.width / ctx.canvas.height);

  window.addEventListener("keydown", (e) => {
  if (e.key == "w" && !isDragonDive) {
  dragonVelocity = 13;
  isDragonDive=true;
  }});
  
  window.addEventListener("keydown", (e) => {
  if (e.key == "d") {
  dragonVelocityX = 10;
  isDragonDash=true;
  }});
  
  function animate(timestamp){
  
    let terrainposY = terrainPointsY[4];
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    dragon();
   	dragonY+=dragonVelocity;
   	dragonX+=dragonVelocityX;

   	
	if(dragonY<0){
		dragonY = 0;
	}
	if(dragonY>(1-terrainposY)*canvas.height-95){
		dragonVelocity = -10;
	}
	if(dragonX<0){
		dragonX = 0;
	}
	if(dragonX>canvas.width/6){
		dragonVelocityX = -20;
	}
	
	
  	if(dragonY==0){
  	  isDragonDive=false;
  	}
  	if(dragonX==0){
  	  isDragonDash=false;
  	}
  	
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


