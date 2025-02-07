window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1280;
  canvas.height = 720;

  ctx.fillStyle = "white";
  ctx.lineWidth = 3;
  ctx.strokeStyle = "white";

  class Player {
    constructor(game) {
      this.game = game;
      this.collisionX = this.game.width * 0.5;
      this.collisionY = this.game.height * 0.5;
      this.collisionRadius = 30;
    }
    draw(context) {
      context.beginPath();
      context.arc(200, 300, 50, 0, Math.PI * 2);
      context.fill();
      context.Stroke();
    }
  }

  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.player = new Player(this);
    }
    render(context) {
      this.player.draw(context);
    }
  }

  const game = new Game(canvas);
  game.render(ctx);
  console.log(game);

  function animate() {}
});
