let snake;
let scl = 20;
let food;

function setup() {
    createCanvas(400, 400);
    snake = new Snake();
    frameRate(10);
    pickLocation();
    console.log("Bem vindo ao Snake Game do Delrick!");
    console.log("Acompanhe sua pontuação pelo console.");
    console.log("Regras para sua cobra não morrer: ");
    console.log("Não encostar nas bordas; Não encostar no próprio corpo.");
    console.log("Não andar em direção a cauda. Divirta-se!");


}

function draw() {
    background(220);
    snake.death();
    snake.update();
    snake.show();
    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
    if (snake.eat(food)) {
        console.log("Pontuação: "+snake.total);
        pickLocation();

    }
}


function keyPressed() {
    if (keyCode === UP_ARROW) {
        snake.dir(0,-1);
    } else if (keyCode === DOWN_ARROW) {
        snake.dir(0, 1);
    } else if (keyCode === LEFT_ARROW) {
        snake.dir(-1, 0);
    } else if (keyCode === RIGHT_ARROW) {
        snake.dir(1, 0);
    }
}

function pickLocation() {
    let cols = floor(width/scl);
    let rows = floor(height/scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);

}
