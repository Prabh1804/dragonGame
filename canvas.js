import {terrain, generateTerrain, terrainY as getterrainY} from "./components/terrain.js";

window.addEventListener("load", () => {

  let loading = document.querySelector(".loading");
  loading.style.display="none";

//  let terrainY = terrainY();
  
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let dragonVelocity = 0;
  window.addEventListener("keydown", (e) => {if (e.key == "w") {
  	dragonVelocity = 10;
  }});
    window.addEventListener("keyup", (e) => {if (e.key == "w") {
  	dragonVelocity = -10;
  }});

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

function handleWindowResize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  window.addEventListener("resize", handleWindowResize);

  generateTerrain(ctx.canvas.width / ctx.canvas.height);
  
  function animate(timestamp){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    dragon();
   	dragonY+=dragonVelocity;		//here
	if(dragonY<0){
		dragonY = 0;
	}
//	if(dragonY>terrainY){
//		dragonY = 0;
//	}
    deltaTime = timestamp - prevTimestamp;
    prevTimestamp = performance.now();
    terrain(ctx, deltaTime / 1000, 0.001);
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 1/60);
  }
  animate(0);
});


