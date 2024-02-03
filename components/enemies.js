export const enemiesList = [];
export const bulletsList = [];

import {terrainPointsY} from "./terrain.js";

const maxCountdown = 1500;

let target = {x: 0, y: 0};

const maybeSummonBullet = (enemy) => {
  
};

export const tickEnemies = (ctx, deltaTime, speed) => {
  for (let i = 0; i < enemiesList.length; i++) {
    const aspectRatio = ctx.canvas.width / ctx.canvas.height;
    enemiesList[i].x -= speed * deltaTime;
    const x = enemiesList[i].x;
    const j = Math.floor(x * terrainPointsY.length / 2);
    const delta = terrainPointsY[j] - enemiesList[i].y;
    enemiesList[i].y += delta;
    const y = enemiesList[i].y;    
    const path = new Path2D();
    path.rect(x * ctx.canvas.height, (1-y) * ctx.canvas.height, 20, -20);
    const prevStyle = ctx.fillStyle;
    ctx.fillStyle = "red";
    path.closePath();
    ctx.fill(path);
    ctx.fillStyle = prevStyle;
    if (x < 0) {
      enemiesList.shift();
    }
  }
};



let prevSummonTime = 0;

let chanceEnemies = 0.4;
const enemies = (aspect_ratio) => {
  if (Math.random() < chanceEnemies) {
    for (let i = 0; i < Math.sqrt(Math.random() * 9); i++){
          enemiesList.push({x: (aspect_ratio - i / 8) , y: terrainPointsY[terrainPointsY.length - 1]});
        }
      }
};

export const initEnemies = (ctx, aspect_ratio) => {
  window.setInterval(() => {enemies(aspect_ratio)}, maxCountdown);
};
