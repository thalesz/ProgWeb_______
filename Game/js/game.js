(function(){

    const FPS = 100; // frame por second
    const TAMX = 600; // largura do jogo
    const TAMY = 600; // altura do jogo
    

    const PROB_ENEMY_SHIP = 0.1;
    const PROB_SPACE_CRAFT = 0.75;
    const PROB_METEOR_BIG = 0.40;
    const PROB_METEOR_SMALL = 0.9;
    const CONT = 0.0002;

    let speed = 1;
    let space, ship, score, life;
    let enemies = [];
    let bullets = [];
   
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
        loseLife(){
            if (this.lifeElements.length > 0) {
                const life = this.lifeElements.pop();
                life.remove();
                ship.element.src = "assets/playerDamaged.png"; 
                setTimeout(()=>{
                    ship.element.src = "assets/player.png";
                },400 )  
            }
            if (this.lifeElements.length === 0) {
                endGame();
            }
        }
    }
    function endGame(){

        clearInterval(interval);
        gameStarted = false;
        
        startMessage.style.display = "block";
        startMessage.innerHTML = `Game Over! Your score: ${score.value}`;        
        limparTela();
        
    }
    function limparTela() {
        ship.element.style.display = "none";

        const elements = document.querySelectorAll('.absolute');
        elements.forEach(el => el.style.display = 'none');

        enemies.forEach(enemy => enemy.destroy());
        enemies = [];

        bullets.forEach(bullet => bullet.destroy());
        bullets = [];
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
            enemies.forEach(enemy => {
                const rect1 = ship.element.getBoundingClientRect();
                const rect2 = enemy.element.getBoundingClientRect();
            
                if (rect1.x < rect2.x + rect2.width &&
                    rect1.x + rect1.width > rect2.x &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.y + rect1.height > rect2.y) {
                    if (!gamePaused) {
                        
                        life.loseLife();
                        enemy.destroy();
                    }
                }
            });
            space.move();
            //space.move(); 
        }
    }
    class Enemies{
        constructor(){
            this.element = document.createElement("img");
            this.element.className = "absolute";
            this.element.style.top = "0px";
            this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`; // vai gerar um numero entre 0 e TAMX
            space.element.appendChild(this.element); //adiciona 
            this.s = 1
        }
        move(speed){
            this.element.style.top = `${parseInt(this.element.style.top)+this.s*speed}px`;
        }
        getRandomPosX() {
            return Math.floor(Math.random() * (TAMX - this.element.offsetWidth));
        }
        destroy(){
            this.element.remove();
            const index = enemies.indexOf(this);
            enemies.splice(index, 1);
        }
        checkCollision(bullet){
            const rect1 = this.element.getBoundingClientRect();
            const rect2 = bullet.element.getBoundingClientRect();
            
    
            if (rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.y + rect1.height > rect2.y) {

                bullet.element.src = "assets/laserGreenShot.png"; 
                setTimeout(()=>{
                    bullet.destroy();
                },50)    
                
                const className = this.constructor.name;

                console.log(className)
                score.increment(className)
                this.destroy();
                
                 
            }
        }
    }
    class Score{
        constructor(){
            this.element = document.getElementById("score");
            this.element.innerHTML = "000000"; // valor inicial da pontuação
            
            this.value = 0;
            this.update();
            
        }
        increment(className) {
            if (className === "SpaceCraft") {
                this.value += 20;
            } else if (className === "EnemyShip") {
                this.value += 50;
            } else if (className === "MeteorBig") {
                this.value += 10;
            } else if (className === "MeteorSmall") {
                this.value += 100;
            }
            
            this.update();
        }
          
        update() {
            this.element.innerHTML = this.value.toString().padStart(6, "0");
        }
    }
    class SpaceCraft extends Enemies{
        constructor(){
            super()         
            this.element.src = "assets/enemyUFO.png";
            this.s = 1.5;
            this.element.style.left = `${this.getRandomPosX()}px`;

        }
        move(){
            super.move(speed)
        }
        
    }
    class EnemyShip extends Enemies{
        constructor(){
            super()
            this.element.src = "assets/enemyShip.png"; // definiu a fonte
            this.s = 2.5;
            this.element.style.left = `${this.getRandomPosX()}px`;

        }
        move(){
            super.move(speed)
        }
    }
    class MeteorBig extends Enemies{
        constructor(){
            super()
            this.element.src = "assets/meteorBig.png"; // definiu a fonte
            this.s = 1;
            this.element.style.left = `${this.getRandomPosX()}px`;

        }
        move(){
            super.move(speed)
        }
    }
    class MeteorSmall extends Enemies{
        constructor(){
            super()
            this.element.src = "assets/meteorSmall.png"; // definiu a fonte
            this.s = 5;
            this.element.style.left = `${this.getRandomPosX()}px`;

        }
        move(){
            super.move(speed)
        }
    }

    class Bullet {
        constructor(x, y) {
            this.element = document.createElement("img");
            this.element.className = "absolute";
            this.element.src = "assets/laserGreen.png"; // definiu a fonte
            this.element.style.left = `${x}px`;
            this.element.style.bottom = `${y}px`;
            space.element.appendChild(this.element);
        }
        
        move() {
          this.element.style.bottom = `${parseInt(this.element.style.bottom) + 5}px`;
          for (let enemy of enemies) {
            enemy.checkCollision(this);
            }
        }
        destroy(){
            
            this.element.remove();
            const index = bullets.indexOf(this);
            bullets.splice(index, 1);
        }
        remove() {
          space.element.removeChild(this.element);
        }
      }


    function call(){
        const random_enemy_ship = Math.random()*100;    

        if(random_enemy_ship <= PROB_ENEMY_SHIP && score.value >=100){
            enemies.push(new EnemyShip())
        }else if(random_enemy_ship <= PROB_SPACE_CRAFT && score.value >= 250){
            enemies.push(new SpaceCraft())
        }else{
            if(random_enemy_ship <= PROB_METEOR_BIG){
                enemies.push(new MeteorBig())
            }else if(random_enemy_ship <= PROB_METEOR_SMALL){
                enemies.push(new MeteorSmall())
            }
        }
        
        
    }
    function bang(){
        for (let i = 0; i < bullets.length; i++) {
            
            if (parseInt(bullets[i].element.style.bottom) > TAMY) {
              bullets[i].remove();
              bullets.splice(i, 1);
              i--;
            } else {
                bullets[i].move();
            }

        }
    }


    function run(){
        //if (gamePaused) return;
        call();
        bang();
        enemies.forEach((e)=>e.move(speed));
        ship.move();
        speed = speed + CONT;
        
        for (let i = 0; i < enemies.length; i++) {
            let enemy = enemies[i];
            if (parseInt(enemy.element.style.top) >= TAMY) {
              // O inimigo saiu da tela, remover do array e do DOM
              enemies.splice(i, 1);
              enemy.element.remove();
            }
          }
    }
    

    window.addEventListener("keydown", (e) => {
        if (e.key === " " && !gameStarted) {
            gameStarted = true;
            init();
        }
    });

    //evento para chamar a bala
    window.addEventListener("keydown", (e)=>{
        if (e.key === " " && !gamePaused && gameStarted) { // tecla de espaço
              const x = parseInt(ship.element.style.left) + ship.element.offsetWidth / 2;
              const y = parseInt(ship.element.style.bottom) + ship.element.offsetHeight;
              const bullet = new Bullet(x, y);
              bullets.push(bullet);
        }
    })


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
