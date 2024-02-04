export let dragonX = 25;
export let dragonY = 20;
export let dragonWidth;
export let dragonHeight;
import {terrainPointsY} from "./terrain.js"
import{bulletsList} from "./enemies.js"
import{isGameRunning, showEndScreen} from "../canvas.js";

  const ctx = canvas.getContext("2d");
  let dragonVelocity = 0;
  let dragonVelocityX = 0;
  let isDragonGnd = false;
//   let isDragonDash = false;
//   let isDragonDive = false;
  let dragonIdleSprite = [];
  let spriteIndex = 1;
  let hitImg = new Image();
  hitImg.src = "/hitdragon.png";
  let hitDisplayTime = 0;
  let score = 0;
export let heart = 5;
  let invincible = false;
export const setHealth = x => heart = x;
export const setScore = x => score = x;

export const initDragon = () => {
  
  for (let i = 0; i < 4; i++){
  	let sprite = new Image;
  	sprite.src=`frame${i}.png`;
  	dragonIdleSprite.push(sprite);	
  }
dragonWidth = dragonIdleSprite[1].width/2;
dragonHeight = dragonIdleSprite[1].height/2
 
  window.addEventListener("keydown", (e) => {
  if (e.key == "s" && !isDragonGnd) {
  dragonVelocity = 8;
  }
  if (e.key == "d") {
  dragonVelocityX = 10;
//   isDragonDash=true;
  }
});

  window.addEventListener("keyup", (e) => {
  if (e.key == "s") {
  dragonVelocity = -8;
//   isDragonDive=true;
  }
  if (e.key == "d") {
  dragonVelocityX = -10;
//   isDragonDash=true;
  }
});
  
	setInterval(()=>{
		spriteIndex++;
	},100);
}

export const drawDragon = () => {


//     const ctx = canvas.getContext("2d");
	let dragonIndex = spriteIndex % 4;
 	if (hitDisplayTime < 1){
	ctx.drawImage(dragonIdleSprite[dragonIndex],dragonX,dragonY,
	dragonIdleSprite[1].width/2,dragonIdleSprite[1].height/2);
 	}
// 	ctx.strokeStyle="white";
// 	ctx.beginPath();
// 	ctx.lineWidth=1;
// 	// ctx.strokeRect(dragonX,dragonY,dragonIdleSprite[1].width/2,dragonIdleSprite[1].height/2);
// 	ctx.stroke();
	
}

export const drawScore = () => {
	if (isGameRunning) {
		score++;
	}
	ctx.fillStyle = "white"
	ctx.font = "25px Arial"
	ctx.fillText("score: " + score , canvas.width - canvas.width/7.5, 20);
}

export const drawHeart = () => {
	ctx.fillStyle = "white"
	ctx.font = "25px Arial"
	ctx.fillText("Health: " + heart , 30, 20);
}

export const collisionDragon = () => {
	for (let i = 0; i < bulletsList.length; i++){
		if(bulletsList[i].x * canvas.height < dragonX + dragonIdleSprite[1].width/2
			&& bulletsList[i].x * canvas.height + 15 > dragonX
			&& bulletsList[i].y * canvas.height < dragonY + dragonIdleSprite[1].height/2
			&& bulletsList[i].y * canvas.height + 15 > dragonY
		){
			bulletsList.splice(i, 1);
// 			console.log("hit");
			hitDisplayTime = 100;
			if (!invincible){
				heart -= 1;
				if (heart < 1) {
					showEndScreen();
				}
				invincible = true;
				setTimeout(()=>{
					invincible=false;
				},100);
			}
		}
	}
}

export const tickDragon = () => {
    const ctx = canvas.getContext("2d");
		dragonY+=dragonVelocity;
   	dragonX+=dragonVelocityX;
    let terrainposY = terrainPointsY[Math.round(dragonX * terrainPointsY.length / ctx.canvas.width )];
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

	if(hitDisplayTime > 0){
 		ctx.drawImage(hitImg,dragonX,dragonY,
 		dragonIdleSprite[1].width/2,dragonIdleSprite[1].height/2);
 		hitDisplayTime -= 16;
 	}
	
	
//   	if(dragonY==20){
//   	  isDragonDive=false;
//   	}
//   	if(dragonX==25){
//   	  isDragonDash=false;
//   	}
  	drawDragon();
 	collisionDragon();
	drawScore();
	drawHeart();
}
