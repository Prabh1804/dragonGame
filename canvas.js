import {terrain, generateTerrain} from "./components/terrain.js";

window.addEventListener("load", () => {

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let deltaTime = 1;
  let prevTimestamp = 0;

	ctx.strokeStyle="white";
	ctx.lineWidth = 5;
	ctx.strokeRect(10,10,100,100);

  console.log(canvas);
  canvas.addEventListener("resize", () => {
    ctx.width = canvas.width;
    ctx.height = canvas.height;
    console.log("Hellox");
    generateTerrain(ctx.width / ctx.height);
  });

  function animate(timestamp){
    deltaTime = timestamp - prevTimestamp;
    prevTimestamp = performance.now();
    console.log(deltaTime);
    terrain(ctx, deltaTime, 0.001);
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 100);
  }
  animate(0);
});
