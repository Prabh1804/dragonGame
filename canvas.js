
import {terrain, generateTerrain, terrainPointsY} from "./components/terrain.js";
import {initEnemies, tickEnemies} from "./components/enemies.js";
export let dragonX = 25;
export let dragonY = 20;

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
  let dragonIdleSprite = [];
  
  for (let i = 0; i < 4; i++){
  	let sprite = new Image;
  	sprite.src=`frame${i+1}.png`;
  	dragonIdleSprite.push(sprite);	
  }
  console.log(dragonIdleSprite);

  
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  let deltaTime = 1;
  let prevTimestamp = 0;
  
function dragon(){	
	ctx.strokeStyle="white";
	ctx.lineWidth = 5;
	ctx.strokeRect(dragonX,dragonY,100,100);
}

function handleWindowResize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  window.addEventListener("resize", handleWindowResize);

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

	if(dragonY<20){
		dragonY = 20;
	}
	if(dragonY>(1-terrainposY)*canvas.height-95){
		dragonVelocity = -10;
	}
	if(dragonX<25){
		dragonX = 25;
	}
	if(dragonX>canvas.width/5.5){
		dragonVelocityX = -20;
	}
	
	
  	if(dragonY==20){
  	  isDragonDive=false;
  	}
  	if(dragonX==25){
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


