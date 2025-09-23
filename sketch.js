let snake; // Variável global que chamará e se tornará nosso objeto Cobra, criado em outra página.

let scl = 20; // Como o objetivo é transformar o canvas em uma grande grade para que a Cobra se movimente para o próximo ponto, essa variável define/acompanha o tamanho da grade. A movimentação e o tamanho do objeto são baseados nessa variável.

let food; // Variável que representa a Comida do jogo. Outra opção seria criar um arquivo separado para ela, assim como foi feito com a Cobra.

function setup() {
    createCanvas(400, 400);
    snake = new Snake(); // Chamando a variável para se tornar o objeto

    frameRate(10); // Como é um jogo retro, diminuir a taxa de quadros faz sentido para dar a sensação de um jogo dos anos 70 ao jogador

    pickLocation(); // Função global que define a posição aleatória da Comida

    // Texto de início do código/jogo. Orienta o jogador a acompanhar sua pontuação no console e como encerrar o jogo:
    console.log("Bem vindo ao Snake Game do Delrick!");
    console.log("Acompanhe sua pontuação pelo console.");
    console.log("Regras para sua cobra não morrer: ");
    console.log("Não encostar nas bordas; Não encostar no próprio corpo.");
    console.log("Para encerrar o jogo, digite S a qualquer momento.");
    console.log("Divirta-se!");
}

function draw() {
    background(220);

    // Desenho das funções criadas dentro do objeto snake.js:
    snake.death();
    snake.update();
    snake.show();

    // Desenho da variável Comida criada nessa página:
    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);

    // If responsável por imprimir a linha de pontuação
    // no console e responsável também por gerar outra comida em outra posição aleatória do Canvas:
    if (snake.eat(food)) {
        console.log("Pontuação: " + snake.total);
        pickLocation();
    }
    // Parte do código que imprime a pontuação no Canvas também, deixando duas opções para o usuário:
    fill(255, 0, 0);
    textSize(16);
    text("Pontuação: " + snake.total, 10, height - 10);
}

// Função global responsável por configurar a direção da Cobra baseado em qual tecla foi pressionada:
function keyPressed() {
    if (keyCode === UP_ARROW) {
        snake.dir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        snake.dir(0, 1);
    } else if (keyCode === LEFT_ARROW) {
        snake.dir(-1, 0);
    } else if (keyCode === RIGHT_ARROW) {
        snake.dir(1, 0);
    } else if (key === "S" || key === "s") {
        noLoop();
        console.log("Jogo encerrado! Obrigado por participar.");
        console.log(
            "Jogo feito por Délrick dos Anjos Ramos - BSI - PUCPR - 2025/2"
        );
    }
}

function pickLocation() {
    // Código que garante o spawn da Comida dentro da grade:
    let cols = floor(width / scl);
    let rows = floor(height / scl);
    food = createVector(floor(random(cols)), floor(random(rows)));

    food.mult(scl); // Linha de código que expande o tamanho de volta
}
