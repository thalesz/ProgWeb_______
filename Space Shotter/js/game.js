(function(){
    const FPS = 100; // frame por second
    const TAMX = 600; // largura do jogo
    const TAMY = 600; // altura do jogo

    const PROB_ENEMY_SHIP = 0.5;
    const PROB_SPACE_CRAFT = 0.6;

    let space, ship, score, life;
    let enemies = [];
    let sc = [];
    let gameStarted = false;
    let gamePaused = false;
    let interval;
    const startMessage = document.querySelector(".start-message");
    const configSpace = document.getElementById("space");
    

    
    configSpace.style.width = `${TAMX}px`;
    configSpace.style.height = `${TAMY}px`;

    
    
    function init(){
        space = new Space();
        ship = new Ship(); 
        score = new Score();
        life = new Life();
        interval = window.setInterval(run, 1000 / FPS); // função e intervalo de tempo
        startMessage.style.display = "none";  
        
    } 
   
    class Score{
        constructor(){
            this.element = document.getElementById("score");
            this.element.innerHTML = "000000"; // valor inicial da pontuação
            
        }
    }
    class Space{
        constructor(){
            this.element = document.getElementById("space"); //captura o elemento e colocou no this.element 
            this.element.style.width = `${TAMX}px`; // altero a argura
            this.element.style.height =`${TAMY}px`; // alterou a altura
            this.element.style.backgroundPositionY = "0px";
        }
        move(){
            this.element.style.backgroundPositionY = `${parseInt(this.element.style.backgroundPositionY) + 1}px`;
        }
    }
    class Life{
        constructor(){
            this.element = document.getElementById("lives");
            this.lifeElements = [];
            for (let i = 0; i < 3; i++) {
                let life = document.createElement("img");
                life.src = "assets/player.png";
                life.classList.add("life");
                this.lifeElements.push(life);
                this.element.appendChild(life);
            }
        }
    }
    class Ship{ //nave
        constructor(){
            this.element = document.getElementById("ship"); //capturou o ship
            this.assetsDirecoes = [ // array com imagens que representa movimento do jogo
                "assets/playerLeft.png", //0
                "assets/player.png", //1
                "assets/playerRight.png" //2
            ];
            this.element.style.display = "block"
            this.direcao = 1; //posição que o usuario esta em determinado momento do jogo
            this.element.src = this.assetsDirecoes[this.direcao]; 
            this.element.style.bottom = "20px";
            this.element.style.left = `${parseInt(TAMX/2) - 50 }px` // posicao que a nave inicializa

        }
        mudaDirecao(giro){
            if(this.direcao+giro >= 0 && this.direcao + giro <= 2 && !gamePaused){ //garantir que vai seguir a direcao do vetor
                this.direcao += giro;
                this.element.src = this.assetsDirecoes[this.direcao];

            }
        }
        move(){
            
            if (this.direcao === 0) {
                let newLeft = parseInt(this.element.style.left) - 1;
                if (newLeft > 0) {
                    this.element.style.left = `${newLeft}px`;
                }
            }
            if (this.direcao === 2) {
                let newLeft = parseInt(this.element.style.left) + 1;
                if (newLeft + this.element.offsetWidth < TAMX) {
                    this.element.style.left = `${newLeft}px`;
                }
            }
            space.move();
            //space.move(); 
        }
    }
    class SpaceCraft{
        constructor(){
            this.element = document.createElement("img");
            this.element.className = "space-craft";
            this.element.src = "assets/enemyUFO.png";
            this.element.style.top = "0px";
            this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`; // vai gerar um numero entre 0 e TAMX
            space.element.appendChild(this.element); //adiciona 

        }
        move(){
            this.element.style.top = `${parseInt(this.element.style.top)+2}px`;
        }
    }
    
    class EnemyShip{
        constructor(){
            this.element = document.createElement("img"); //criou o elemento pq n estava no html
            this.element.className = "enemy-ship" //definiu a classe
            this.element.src = "assets/enemyShip.png"; // definiu a fonte
            this.element.style.top = "0px";
            this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`; // vai gerar um numero entre 0 e TAMX
            space.element.appendChild(this.element); //adiciona 
        }

        move(){
            this.element.style.top = `${parseInt(this.element.style.top)+2}px`;
        }

    }

    function run(){
        const random_enemy_ship = Math.random()*100;
        
        if(random_enemy_ship <= PROB_ENEMY_SHIP){
             enemies.push(new EnemyShip())

        }
        if(random_enemy_ship <= PROB_SPACE_CRAFT){
             sc.push(new SpaceCraft())
        }
        enemies.forEach((e)=>e.move());
        sc.forEach((e)=>e.move());
        ship.move();
    }
    

    window.addEventListener("keydown", (e) => {
        if (e.key === " " && !gameStarted) {
            gameStarted = true;
            init();
        }
    });

    window.addEventListener("keydown", (e) => {
        if (gameStarted) {
            if (e.key === "ArrowLeft") {
                ship.mudaDirecao(-1);
            } else if (e.key === "ArrowRight") {
                ship.mudaDirecao(+1);
            }
        }
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "p"  && gameStarted) {
            if (!gamePaused) {
                clearInterval(interval);
                space.element.classList.add("paused");
                gamePaused = true;
            } else {
                interval = setInterval(run, 1000 / FPS);
                space.element.classList.remove("paused");
                gamePaused = false;
            }
        }
    });    

    
}())
