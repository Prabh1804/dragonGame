
class Button {
  #intersectingListener;
  #clickListener;
  #isMouseOver = false;
  constructor(text, font, width, height, onClick, btnTextOff, borderColor = "#ffffff", backgroundColor = "#00aa00", backgroundDefaultColor = "#aa0000", fontColor = "#0000aa", fontOutline = "#123456") {
    this.x = 0;
    this.y = 0;
    this.text = text;
    this.font = font;
    this.width = width;
    this.btnTextOff = btnTextOff;
    this.height = height;
    this.onClick = onClick;
    this.borderColor = borderColor;
    this.backgroundColor = backgroundColor;
    this.backgroundDefaultColor = backgroundDefaultColor;
    this.fontColor = fontColor;
    this.fontOutline = fontOutline;
    this.#intersectingListener = (e) => {if (this.isIntersecting(e.clientX, e.clientY)) {
      this.#isMouseOver = true;
      } else {
        this.#isMouseOver = false
      }
      };
    this.#clickListener = (e) => {console.log("Hello");if (this.#isMouseOver) {
     console.log("Clicked");
     this.onClick(this, e.target.offsetLeft - e.clientX, e.target.offsetTop - e.clientY);
    }};
    canvas.addEventListener("click", this.#clickListener);
    console.log(this.#clickListener);
    canvas.addEventListener("mousemove", this.#intersectingListener);
  } 
  isIntersecting(x, y) {
    return (x > this.x - this.width / 2 && y > this.y - this.height / 2 && x < (this.x + this.width / 2) && y < (this.y + this.height / 2));
  }

  drawButton(ctx) {
    ctx.textAlign = "center";
    ctx.strokeStyle = this.borderColor;
    ctx.fillStyle = this.#isMouseOver ? this.backgroundColor : this.backgroundDefaultColor;
    const path = new Path2D();
    path.roundRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height, 20);
    path.closePath();
    ctx.stroke(path);
    ctx.fill(path);
    const prevFont = ctx.font;
    ctx.font = this.font;
    ctx.strokeStyle = this.fontOutline;
    ctx.fillStyle = this.fontColor;
    ctx.fillText(this.text, this.x, this.y + this.btnTextOff);
    ctx.font = prevFont;
  }
  destroy() {
    canvas.removeEventListener("mousemove",this.#intersectingListener);
    canvas.removeEventListener("click",this.#clickListener);
  }
}

export class Screen {
  constructor(headingFont, buttonFont, btnTextOff, text, buttonText, onClick) {
    this.headingFont = headingFont;
    this.buttonFont = buttonFont;
    this.text = text;
    this.btnTextOff = btnTextOff;
    this.buttonText = buttonText;
    this.onClick = onClick;
    this.button = new Button(buttonText, buttonFont, 200, 100, onClick, btnTextOff);
    this.button.backgroundDefaultColor = "#a8a8a8";
    this.button.fontColor = "#000000";
    this.button.backgroundColor = "#545454";
  }
  
  drawScreen(ctx) {
    ctx.font = this.headingFont;
    ctx.textAlign = "center";
    ctx.fillText("dragonGame",ctx.canvas.width / 2, ctx.canvas.height / 2 - 100);
    this.button.x = ctx.canvas.width / 2;
    this.button.y = ctx.canvas.height / 2 + 30;
    this.button.drawButton(ctx);
  }
}
