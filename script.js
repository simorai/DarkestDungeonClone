// Adiciona um event listener para o evento 'load' da janela.
// Isso garante que todo o código dentro desta função será executado apenas quando a página estiver completamente carregada.
window.addEventListener("load", function () {
  // Obtém a referência ao elemento canvas no HTML com o id "canvas1"
  const canvas = document.getElementById("canvas1");
  // Obtém o contexto de renderização 2D do canvas, que fornece métodos e propriedades para desenhar no canvas
  const ctx = canvas.getContext("2d");
  // Define a largura do canvas como 1280 pixels
  canvas.width = 1280;
  // Define a altura do canvas como 720 pixels
  canvas.height = 720;

  // Define a cor de preenchimento para branco
  ctx.fillStyle = "white";
  // Define a largura da linha para 3 pixels
  ctx.lineWidth = 3;
  // Define a cor da linha (contorno) para branco
  ctx.strokeStyle = "white";

  // Define a classe Player que representa o jogador no jogo
  class Player {
    constructor(game) {
      // Armazena a referência ao objeto game
      this.game = game;
      // Define a posição X inicial do jogador como metade da largura do canvas
      this.collisionX = this.game.width * 0.5;
      // Define a posição Y inicial do jogador como metade da altura do canvas
      this.collisionY = this.game.height * 0.5;
      // Define o raio de colisão do jogador
      this.collisionRadius = 50;
      // Inicializa a velocidade X do jogador como 0
      this.speedX = 0;
      // Inicializa a velocidade Y do jogador como 0
      this.speedY = 0;
      // Inicializa a diferença X entre o mouse e o jogador como 0
      this.dx = 0;
      // Inicializa a diferença Y entre o mouse e o jogador como 0
      this.dy = 0;
      // Define o modificador de velocidade do jogador
      this.speedModifier = 5;
    }

    // Método para desenhar o jogador no canvas
    draw(context) {
      // Inicia um novo caminho de desenho
      context.beginPath();
      // Desenha um círculo representando o jogador
      context.arc(
        this.collisionX,
        this.collisionY,
        this.collisionRadius,
        0,
        Math.PI * 2
      );
      // Salva o estado atual do contexto
      context.save();
      // Define a opacidade global para 0.5 (50% transparente)
      context.globalAlpha = 0.5;
      // Preenche o círculo com a cor atual
      context.fill();
      // Restaura o estado anterior do contexto
      context.restore();
      // Desenha o contorno do círculo
      context.stroke();
      // Inicia um novo caminho de desenho
      context.beginPath();
      // Move o "lápis" para a posição do jogador
      context.moveTo(this.collisionX, this.collisionY);
      // Desenha uma linha até a posição atual do mouse
      context.lineTo(this.game.mouse.x, this.game.mouse.y);
      // Desenha a linha
      context.stroke();
    }

    // Método para atualizar a posição do jogador
    update() {
      // Calcula a diferença X entre o mouse e o jogador
      this.dx = this.game.mouse.x - this.collisionX;
      // Calcula a diferença Y entre o mouse e o jogador
      this.dy = this.game.mouse.y - this.collisionY;
      // Calcula a distância entre o jogador e o mouse usando o teorema de Pitágoras
      const distance = Math.hypot(this.dy, this.dx);
      // Se a distância for maior que o modificador de velocidade
      if (distance > this.speedModifier) {
        // Normaliza a velocidade X (divide pela distância para obter um valor entre -1 e 1)
        this.speedX = this.dx / distance || 0;
        // Normaliza a velocidade Y
        this.speedY = this.dy / distance || 0;
      } else {
        // Se estiver próximo o suficiente, para o movimento
        this.speedX = 0;
        this.speedY = 0;
      }

      // Atualiza a posição X do jogador
      this.collisionX += this.speedX * this.speedModifier;
      // Atualiza a posição Y do jogador
      this.collisionY += this.speedY * this.speedModifier;
    }
  }

  // Define a classe Game que gerencia o estado geral do jogo
  class Game {
    constructor(canvas) {
      // Armazena a referência ao elemento canvas
      this.canvas = canvas;
      // Obtém a largura do canvas
      this.width = this.canvas.width;
      // Obtém a altura do canvas
      this.height = this.canvas.height;
      // Cria uma nova instância do jogador
      this.player = new Player(this);
      // Inicializa o objeto que rastreia o estado do mouse
      this.mouse = {
        x: this.width * 0.5,
        y: this.height * 0.5,
        pressed: false,
      };
      // Adiciona um event listener para o evento 'mousedown' no canvas
      canvas.addEventListener("mousedown", (e) => {
        // Atualiza a posição X do mouse
        this.mouse.x = e.offsetX;
        // Atualiza a posição Y do mouse
        this.mouse.y = e.offsetY;
        // Define o estado do mouse como pressionado
        this.mouse.pressed = true;
      });
      // Adiciona um event listener para o evento 'mouseup' no canvas
      canvas.addEventListener("mouseup", (e) => {
        // Atualiza a posição X do mouse
        this.mouse.x = e.offsetX;
        // Atualiza a posição Y do mouse
        this.mouse.y = e.offsetY;
        // Define o estado do mouse como não pressionado
        this.mouse.pressed = false;
      });
      // Adiciona um event listener para o evento 'mousemove' no canvas
      canvas.addEventListener("mousemove", (e) => {
        // Se o mouse estiver pressionado
        if (this.mouse.pressed) {
          // Atualiza a posição X do mouse
          this.mouse.x = e.offsetX;
          // Atualiza a posição Y do mouse
          this.mouse.y = e.offsetY;
        }
      });
    }
    // Método para renderizar o estado atual do jogo
    render(context) {
      // Desenha o jogador no canvas
      this.player.draw(context);
      // Atualiza a posição do jogador
      this.player.update();
    }
  }

  // Cria uma nova instância do jogo
  const game = new Game(canvas);

  // Função de animação que é chamada repetidamente
  function animate() {
    // Limpa todo o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Renderiza o estado atual do jogo
    game.render(ctx);
    // Solicita ao navegador que chame a função animate novamente antes do próximo repaint
    requestAnimationFrame(animate);
  }
  // Inicia o loop de animação
  animate();
});
