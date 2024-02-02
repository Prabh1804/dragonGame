import "./components/terrain.js";
// let deltaTime = 1;
// let prevTimestamp = 0;
// 
// const step = (timestamp) => {
  // deltaTime = timestamp - prevTimestamp;
  // prevTimestamp = timestamp;
  // requestAnimationFrame(step);
// }
 // function animate(){
	// prevTimestamp = performance.now();
	// requestAnimationFrame(step);
 // }
// animate();

window.addEventListener("load",e=>{
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;	
	ctx.strokeStyle="white";
	ctx.lineWidth = 5;
	ctx.strokeRect(10,10,100,100);
});
