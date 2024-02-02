import {terrain, generateTerrain} from "./components/terrain.js";

window.addEventListener("load", () => {

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let deltaTime = 1;
  let prevTimestamp = 0;

	ctx.strokeStyle="white";
	ctx.lineWidth = 5;
	ctx.strokeRect(10,10,100,100);

  const canvasResizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {

      ctx.canvas.width  = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, ctx.width, ctx.height);
    }
  });
  canvasResizeObserver.observe(canvas);

  generateTerrain(ctx.canvas.width / ctx.canvas.height);
  function animate(timestamp){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    deltaTime = timestamp - prevTimestamp;
    prevTimestamp = performance.now();
    terrain(ctx, deltaTime / 1000, 0.001);
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 1/60);
  }
  animate(0);
});


