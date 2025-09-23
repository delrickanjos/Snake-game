// Arquivo que contém todo o objeto Cobra do código

function Snake() {
    // Posição X e Y inicial da Cobra:
    this.x = 0;
    this.y = 0;
    // Tracking/Definição da velocidade dela:
    this.xspeed = 1;
    this.yspeed = 0;
    // Tracking e armazenamento das localizações passadas da Cobra para fazê-la crescer:
    this.total = 0; // Contador de quantas comidas a Cobra comeu
    this.tail = []; // A largura da array será equivalente ao histórico de x e y da Cobra

    // Função responsável por reconhecer e reiniciar o tamanho da Cobra se alguma colisão tiver ocorrido. Além disso, também zera o contador:
    this.death = function () {
        // Loop que irá varrer a array buscando descobrir se a posição da cabeça é praticamente a mesma do rabo:
        for (let i = 0; i < this.tail.length; i++) {
            let pos = this.tail[i];
            let d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                // Se sim, reiniciará o tamanho e o contador:
                this.total = 0;
                this.tail = [];
                console.log("Você morreu. Reiniciando...");
            }
        }
    };
    // Função responsável por fazer com que a Cobra e sua cauda se mexam, além de definir a velocidade e também restrigir a Cobra no Canvas:
    this.update = function () {
        // Condição if que irá checar se alguma coisa foi comida:
        if (this.total === this.tail.length) {
            // Loop responsável por fazer, caso nada tenha sido comido ainda, a inversão de todos os lugares da array. Isso é necessário para que a localização atual da Cobra se transforme na última posição da array, fazendo com que o histórico da localização seja inteiramente deslocado para trás:
            for (let i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        if (this.total >= 1) {
            //Se algo já tiver sido comido, armazenar a localização atual para que a Cobra possa continuar se movendo:
            this.tail[this.total - 1] = createVector(this.x, this.y);
        }
        // Parte do código que define a velocidade da Cobra de acordo com a escala pré-definida para que não ande fora da grade. Também impede que ela saia do canvas utilizando constrain:
        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;
        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);
    };
    // Função responsável por desenhar a cauda, e a Cobra em si, no Canvas. A função também define a cor da Cobra:
    this.show = function () {
        fill(0, 255, 0);
        rect(this.x, this.y, scl, scl);
        for (let i = 0; i < this.tail.length; i++) {
            // Loop responsável por desenhar a cauda inteira no Canvas, com base em sua posição no indice:
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
    };
    // Função que receberá dois valores (x e y) e transformará eles no novo this.xspeed e this.yspeed:
    this.dir = function (x, y) {
        // Condição que impede o usuário de andar para a direção inversa com a sua Cobra. Levando em conta que resetamos o tamanho dela pela distância da cabeça com a cauda, isso evitará muitos bugs no jogo:
        if (this.xspeed !== -x && this.yspeed !== -y) {
            this.xspeed = x;
            this.yspeed = y;
        }
    };
    // Função para "comer" a Comida - Receberá a posição dela pelo vetor criado em pickLocation:
    this.eat = function (pos) {
        let d = dist(this.x, this.y, pos.x, pos.y);

        if (d < 1) {
            // O objetivo é confirmar se a Cobra alcançou a comida ou não através da distância entre a Cobra e a Comida. Se sim, somar um no contador:
            this.total++;
            return true;
        } else {
            return false;
        } // Esses valores booleanos acima irão direto para a condição if dentro de Draw. Esse if será responsável por chamar a função pickLocation (somente se a Cobra tiver comido) e por somar um ponto na pontuação.
    };
}
