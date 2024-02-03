export let dragonX = 25;
export let dragonY = 20;
import {terrainPointsY} from "./terrain.js"

  let dragonVelocity = 0;
  let dragonVelocityX = 0;
  let isDragonGnd = false;
  let isDragonDash = false;
  let isDragonDive = false;
  let dragonIdleSprite = [];
  let spriteIndex = 1;

export const initDragon = () => {
  
  for (let i = 0; i < 4; i++){
  	let sprite = new Image;
  	sprite.src=`frame${i}.png`;
  	dragonIdleSprite.push(sprite);	
  }
 
  window.addEventListener("keydown", (e) => {
  if (e.key == "w" && !isDragonGnd) {
  dragonVelocity = 8;
  }});

  window.addEventListener("keyup", (e) => {
  if (e.key == "w") {
  dragonVelocity = -8;
  isDragonDive=true;
  }});
  
  window.addEventListener("keydown", (e) => {
  if (e.key == "d") {
  dragonVelocityX = 10;
  isDragonDash=true;
  }});

  window.addEventListener("keyup", (e) => {
  if (e.key == "d") {
  dragonVelocityX = -10;
  isDragonDash=true;
  }});
  
	setInterval(()=>{
		spriteIndex++;
	},100);
}

export const drawDragon = () => {	

    const ctx = canvas.getContext("2d");
	let dragonIndex = spriteIndex % 4;
	ctx.drawImage(dragonIdleSprite[dragonIndex],dragonX,dragonY,
	dragonIdleSprite[1].width/2,dragonIdleSprite[1].height/2);
	ctx.strokeStyle="white";
	ctx.beginPath();
	ctx.linwWidth=1;
	// ctx.strokeRect(dragonX,dragonY,dragonIdleSprite[1].width/2,dragonIdleSprite[1].height/2);
	ctx.stroke();
	
}

export const tickDragon = () => {
	dragonY+=dragonVelocity;
   	dragonX+=dragonVelocityX;
    let terrainposY = terrainPointsY[4];


	if(dragonY<20){
		dragonY = 20;
	}
	if(dragonY>(1-terrainposY)*canvas.height-70){
		dragonVelocity = -0.5;
		isDragonGnd = true;
	}
	else{
		isDragonGnd = false;
	}
	if(dragonX<25){
		dragonX = 25;
	}
	if(dragonX>canvas.width){
		dragonVelocityX = -20;
	}
	
	
  	if(dragonY==20){
  	  isDragonDive=false;
  	}
  	if(dragonX==25){
  	  isDragonDash=false;
  	}
  	drawDragon();

}
