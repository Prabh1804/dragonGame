const terrainPointsY = [];
const detail = 100;

const sineWaves = [];
for (let i = 0; i < 10; i++) {
  sineWaves.push({phase: Math.random() * Math.PI, amplitude: (Math.random() + 1) * 0.5})
}

const getY = (x) => {
  let y = 0;
  for (const wave of sineWaves) {
    y += Math.sin(wave.phase * x) * wave.amplitude; 
  }
  return y;
}

let terrainPosX = 0 ;

// Aspect ratio is Width / Height
export const generateTerrain = (aspectRatio) => {
  console.log("GeneratedTerrain");
  for (let i = 0; i < detail; i++) {
    const x = i / detail + terrainPosX;
    const y = getY(x);
    terrainPointsY.push(y);
  }
};


export const terrain = (ctx, timedelta, speed) => {
  ctx.beginPath()
  ctx.moveTo(0, ctx.canvas.height);
  for (let i = 0; i < terrainPointsY.length; i++) {
    const x = i / terrainPointsY.length - terrainPosX; 
    let y = terrainPosY[i];
    ctx.lineTo(x * ctx.canvas.height, y * ctx.canvas.height);
    ctx.moveTo(x * ctx.canvas.height, y * ctx.canvas.height);
  }
  ctx.moveTo(ctx.canvas.width, ctx.canvas.height);
  ctx.closePath();
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.stroke();
  terrainPosX += timedelta * speed;
  console.log(terrainPointsY);
  for (let i = 0; i < terrainPointsY.length; i++) {
    if (terrainPointsY[i] - terrainPosX < 0) {
      terrainPoints.pop();
      terrainPoints.push(getY(i / terrainPointsY.length - terrainPosX));
      break;
    }
  }
}
