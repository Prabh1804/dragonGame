export const enemiesList = [];
export const bulletsList = [];

import {terrainPointsY} from "./terrain.js";
import {dragonX, dragonY} from "./dragon.js";

const maxCountdown = 1500;

let aspectRatio = 1;

const fireDelay = 1000;
const summonBullet = (enemy, scale) => {
  bulletsList.push({angle: Math.atan2(dragonY - (1-enemy.y) * scale , dragonX - enemy.x * scale), speed: 0.001, x: enemy.x, y: 1-enemy.y});
};

export const tickBullets = (ctx, deltaTime) => {
  for (let i = 0; i < bulletsList.length; i++) {
    let bullet = bulletsList[i];
    bullet.x += bullet.speed * deltaTime * Math.cos(bullet.angle);
    bullet.y += bullet.speed * deltaTime * Math.sin(bullet.angle);
    const prevStyle = ctx.fillStyle;
    const prevStrokeStyle = ctx.strokeStyle;
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#ffffff";
    ctx.strokeRect(bullet.x * ctx.canvas.height, bullet.y * ctx.canvas.height, 10, 10);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = prevStyle;
    ctx.strokeStyle = prevStrokeStyle;
  }
  for (let i = 0; i < bulletsList.length; i++) {
    if (bulletsList[i].x < 0 || bulletsList[i].y < 0) {
      bulletsList.splice(i, 1);
      i--;
    }
  }
}

export const tickEnemies = (ctx, deltaTime, speed) => {
  for (let i = 0; i < enemiesList.length; i++) {
    const aspectRatio = ctx.canvas.width / ctx.canvas.height;
    enemiesList[i].x -= speed * deltaTime;
    const x = enemiesList[i].x;
    const j = Math.min(Math.round(x * terrainPointsY.length / 2), terrainPointsY.length - 1);
    const delta = terrainPointsY[j] - enemiesList[i].y;
    enemiesList[i].y += delta;
    const y = enemiesList[i].y;    
    const prevStyle = ctx.fillStyle;
    const prevStrokeStyle = ctx.strokeStyle;
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#ffffff";
    ctx.strokeRect(x * ctx.canvas.height, (1-y) * ctx.canvas.height, -20, -20);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = prevStyle;
    ctx.strokeStyle = prevStrokeStyle;
    if (x < 0) {
      const enemy = enemiesList.shift();
      clearInterval(enemy.gun);
    }
  }
};



let prevSummonTime = 0;

let chanceEnemies = 0.4;
const enemies = (aspect_ratio, ctx) => {
  if (Math.random() < chanceEnemies) {
    aspectRatio = ctx.canvas.width / ctx.canvas.height;
    for (let i = 0; i < Math.sqrt(Math.random() * 9); i++){
          enemiesList.push({x: (aspect_ratio - i / 8) , y: terrainPointsY[terrainPointsY.length - 1]});
          enemiesList[enemiesList.length - 1].gun = setInterval(() => {summonBullet(enemiesList[enemiesList.length - 1], ctx.canvas.height)}, fireDelay);
        }
      }
};

export const initEnemies = (ctx, aspect_ratio) => {
  window.setInterval(() => {enemies(aspect_ratio, ctx)}, maxCountdown);
};
