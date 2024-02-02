const enemiesList = [];

import {terrainPointsY} from "./terrain.js";

const maxCountdown = 1000;

export const tickEnemies = (ctx, deltaTime, speed) => {
  for (let i = 0; i < enemiesList.length; i++) {
    enemiesList[i].x -= speed * deltaTime;
    const x = enemiesList[i].x;
    const y = enemiesList[i].y;
    ctx.rect(x * ctx.canvas.height, y * ctx.canvas.height, x*ctx.canvas.height+200, y*ctx.canvas.height-200);
    const prevStyle = ctx.fillStyle;
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.fillStyle = prevStyle;
    if (x < 0) {
      enemiesList.shift();
    }
  }
};


let prevSummonTime = 0;

let chanceEnemies = 0.5;

const enemies = (aspect_ratio) => {
  if (Math.random() < chanceEnemies) {
    enemiesList.push({x: aspect_ratio, y: terrainPointsY[terrainPointsY.length - 1]});    
    console.log(enemiesList);
  }
};

export const initEnemies = (ctx, aspect_ratio) => {
  window.setInterval(() => {enemies(aspect_ratio)}, maxCountdown);
};
