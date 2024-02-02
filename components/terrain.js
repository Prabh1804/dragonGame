const detail = 100;
const terrainPointsY = Array(detail);

const sineWaves = [];
for (let i = 0; i < 50; i++) {
  sineWaves.push({phase: Math.random() * 10 , amplitude: (Math.random() * 1.5 ) })
}

const getY = (x) => {
  let y = 0;
  for (const wave of sineWaves) {
    const phase = (wave.phase * Math.sin(x/12)) % Math.PI ;
    y += (Math.sin(phase) + 1) * wave.amplitude; 
  }
  y /= sineWaves.length * 2;
  return y;
}

let terrainPosX = 0 ;

// Aspect ratio is Width / Height
export const generateTerrain = (aspectRatio) => {
  for (let i = 0; i < detail; i++) {
    const x = ((i / detail + terrainPosX)) * aspectRatio;
    const y = getY(x);
    terrainPointsY[i] = y;
  }
};


export const terrain = (ctx, timedelta, speed) => {
  let aspectRatio = ctx.canvas.width / ctx.canvas.height;
  if (isNaN(aspectRatio)) {
    aspectRatio = 1;
  }
  let firstX, lastX;
  let terrainPath = new Path2D();
  terrainPath.moveTo(0, ctx.canvas.height);
  terrainPath.lineTo(0, (1 - terrainPointsY[0]) * ctx.canvas.height);
  for (let i = 0; i < terrainPointsY.length; i++) {
    const x = ((i+1) / terrainPointsY.length) * aspectRatio; 
    let y = 1 - terrainPointsY[i];
    if (i == 0) {
      firstX = x;
    }
    if (i == terrainPointsY.length - 1) {
      lastX = x;
    } 
    terrainPath.lineTo(x * ctx.canvas.height, y * ctx.canvas.height);
  }
  terrainPath.lineTo(ctx.canvas.width, (1-terrainPointsY[terrainPointsY.length - 1])*ctx.canvas.height);
  terrainPath.lineTo(ctx.canvas.width, ctx.canvas.height);
  terrainPath.moveTo(ctx.canvas.width, ctx.canvas.height);
  terrainPath.lineTo(0, ctx.canvas.height);
  terrainPath.closePath();
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.lineWidth = 10;
  ctx.fill(terrainPath);
  ctx.stroke(terrainPath);
  ctx.fillStyle = "green";
  // terrainPosX += timedelta * speed;
  terrainPosX += timedelta;
  terrainPointsY.shift();
  terrainPointsY.push(getY((1 + terrainPosX) * aspectRatio));
}
