const caseSize = 16;
let snakeTab;
let snake;
let time;

const screen = {
    START:"start",
    GAME:"game",
    ENDGAME:"endgame"
};

const direction = {
    UP : "up",
    RIGHT : "right",
    DOWN : "down",
    LEFT : "left"
};


let tabJeu;
let score;

let etatActuelJeu;
const etatJeu={
    START : "start",
    INGAME : "ingame",
    END : "fin"
};

const caseJeu ={
    VOID:"void",
    SNAKE:"snake",
    APPLE:"apple"
};

// position de l'unique pomme du jeu
let appleX;
let appleY;

function preload(){
     imgTete = loadImage("../../resources/imagesSnake/Snake_tete0.png");
     imgCorps = loadImage("../../resources/imagesSnake/corps/Snake_corps.png");
     imgQueue = loadImage("../../resources/imagesSnake/Snake_queue0.png");
     imgCorpsH = loadImage("../../resources/imagesSnake/corps/Snake_corpsHorizontal.png");
     imgApple = loadImage("../../resources/imagesSnake/pomme.png");
     initTabImages();
}

function setup() {
    frameRate(10);
    const canvas = createCanvas(caseSize * 25, caseSize * 25);
    canvas.parent("sketchHolder");

    etatActuelJeu=etatJeu.START;

    startButton = new Button(width/2, height/2, 60, 20, "Start");
    continueButton = new Button(width/2, height*0.75, 90, 20, "Continue");

    setupBis();

}


function setupBis(){
        initialiserTabJeu();
        score=0;
        snake = new Snake(128,128);
        appleSpawn();
}

class snakeParts{
    constructor(img,x,y) {
        this.posX=x;
        this.posY=y;
        this.image=img;
        this.orientation=0; // 0,1,2,3 sur une croix, sens des aguilles d'une montre (haut0, droite1, bas2, gauche3)
        this.orientationPrec=0;
    }

    setOrientation(o){
        this.orientation=o;
    }


    getOrientation(){
        return this.orientation;
    }

    getX(){
        return this.posX;
    }

    getY(){
        return this.posY;
    }

    setX(x){
        this.posX=x;
    }

    setY(y){
        this.posY=y;
    }

    getImage(){
        return this.image;
    }

    setImage(im){
        this.image=im;
    }
}

function keyPressed(){
    if(etatActuelJeu == etatJeu.INGAME){
        snake.updateDirection(keyCode);
    }
}

class Snake{
    constructor(x,y) {
        const tete = new snakeParts(imgTete, x, y + caseSize);
        const corps = new snakeParts(imgCorps, x, y + 2 * caseSize);
        const queue = new snakeParts(imgQueue, x, y + 3 * caseSize);
        snakeTab = [tete,corps,queue];
        this.direction=direction.UP;
        this.directionPrec=direction.UP;
    }

    getDirectionPrec(){
        return this.directionPrec;
    }

    getTab(){
        return snakeTab;
    }

    getDirection(){
        return this.direction;
    }

    setDirection(direction){
        this.direction=direction;
    }

    eatApple(){
        if(tabJeu[snakeTab[0].getX()/caseSize][snakeTab[0].getY()/caseSize]==caseJeu.APPLE){
            score++;
            tabJeu[snakeTab[0].getX()/caseSize][snakeTab[0].getY()/caseSize]=caseJeu.VOID;
            appleSpawn();
            console.log("Score:"+score);
            return true;
        }
        return false;
    }

    afficherSnake(){
        textSize(20);
        for (let i=0; i<snakeTab.length; i++){
            text("Snake long : "+snakeTab.length, (width/4)*2.5, (height/4)*3);
            text("Snake"+snakeTab[i].getX()+","+snakeTab[i].getY(), width/2 ,20*i+100);
        }
    }

    updateDirection(k){
        //this.calcRate++;
        //if(this.calcRate%REFRESH_RATE == 0){
        if(k == UP_ARROW && this.getDirectionPrec()!=direction.UP && this.getDirectionPrec()!=direction.DOWN){
            this.setDirection(direction.UP);
            snakeTab[0].set
        } else if(k == RIGHT_ARROW && this.getDirectionPrec()!=direction.RIGHT && this.getDirectionPrec()!=direction.LEFT){
            this.setDirection(direction.RIGHT);
        } else if(k == DOWN_ARROW && this.getDirectionPrec()!=direction.UP && this.getDirectionPrec()!=direction.DOWN){
            this.setDirection(direction.DOWN);
        } else if(k == LEFT_ARROW && this.getDirectionPrec()!=direction.RIGHT && this.getDirectionPrec()!=direction.LEFT){
            this.setDirection(direction.LEFT);
        }
        text("Direction : "+this.getDirection(),50,50);

    }

    move(){

        this.directionPrec=this.getDirection();

        if(this.eatApple()==true){
            console.log("eatApple==true");
            for(let i=snakeTab.length-1; i>=1; i--){
                snakeTab[i+1]=snakeTab[i];//rajoute 1 case
            }
            snakeTab[1]=new snakeParts(imgCorps,snakeTab[0].getX(),snakeTab[0].getY());
            snakeTab[1].setOrientation(snakeTab[0].getOrientation());

        }else{
            for(let k=snakeTab.length-1; k>0; k--){
                //text("k="+k+"snakeTab[k].getY(k):"+snakeTab[k].getY(),100,200+20*k);
                //text("k2="+k+"snakeTab[k].getY(k-1):"+snakeTab[k-1].getY(),0,340+20*k);
                snakeTab[k].setX(snakeTab[k-1].getX());
                snakeTab[k].setY(snakeTab[k-1].getY()); // ok
                //var langue = new snakeParts(imgLangue,x,y);
                let x = snakeTab[k-1].getX();
                let y = snakeTab[k-1].getY();

                image(snakeTab[k].getImage(),x,y);
                //text("snakeTab["+k+"]->"+snakeTab[k-1].getY(),80,80+20*k);
                //text("sT["+k+"]->"+snakeTab[k-1].getX(),290,80+20*k);
            }
            for(let k=snakeTab.length-1; k>0; k--){
                snakeTab[k].setOrientation(snakeTab[k-1].getOrientation());
            }
        }

        if(this.getDirection()==direction.UP && snakeTab[0].getY()>0 ){
            snakeTab[0].setY(snakeTab[0].getY()-caseSize);
            snakeTab[0].setOrientation(0);
        }else if(this.getDirection()==direction.DOWN && snakeTab[0].getY()<height){
            snakeTab[0].setY(snakeTab[0].getY()+caseSize);
            snakeTab[0].setOrientation(2);
        }else if(this.getDirection()==direction.LEFT && snakeTab[0].getX()>0){
            snakeTab[0].setX(snakeTab[0].getX()-caseSize);
            snakeTab[0].setOrientation(3);
        }else if(this.getDirection()==direction.RIGHT && snakeTab[0].getX()<width){
            snakeTab[0].setX(snakeTab[0].getX()+caseSize);
            snakeTab[0].setOrientation(1);
        }

    }

        drawSnake(){
            snakeTab[0].setImage(tabTete[snakeTab[0].getOrientation()]);
            image(snakeTab[0].getImage(), snakeTab[0].getX(), snakeTab[0].getY());
            snakeTab[snakeTab.length-1].setImage(tabQueue[snakeTab[snakeTab.length-2].getOrientation()]);
            image(snakeTab[snakeTab.length-1].getImage(), snakeTab[snakeTab.length-1].getX(), snakeTab[snakeTab.length-1].getY());

            for(let k=snakeTab.length-2; k>0; k--){ // orientation change pas donc image change pas
                if(snakeTab[k].getOrientation()==snakeTab[k-1].getOrientation()){
                    snakeTab[k].setImage(tabImg[snakeTab[k].getOrientation()][snakeTab[k-1].getOrientation()]);
                    image(snakeTab[k].getImage(),snakeTab[k].getX(),snakeTab[k].getY());
                }else{
                    console.log("Orientation "+snakeTab[k].getOrientation()+"->orSup("+snakeTab[k-1].getOrientation()+")");
                    console.log("snakeTab[k]:"+k);

                    snakeTab[k].setImage(tabImg[snakeTab[k].getOrientation()][snakeTab[k-1].getOrientation()]);
                    image(snakeTab[k].getImage(),snakeTab[k].getX(),snakeTab[k].getY());
                }
                text("OR(k="+k+")"+snakeTab[k].getOrientation(),30,30+15*k);
            }
        }
}

function verifierMort() {// gérer les collisions avec lui meme
    let hitItSelf = false;
    for (let i = 0; i < snakeTab.length-1; i++) {
        for (let j = 0; j < snakeTab.length-1; j++) {
            if (i != j && snakeTab[i].getX() == snakeTab[j].getX() && snakeTab[i].getY() == snakeTab[j].getY()) {
                hitItSelf = true;
                text("hitItSelf", 50, 50);
            }
        }
     }
    if(outOfBound()==true || hitItSelf==true){
            //text("THE END (hit border)", 20, 20);
            etatActuelJeu = etatJeu.END;
            saveScore(currentGameName,score,(millis()-time));
            console.log("Final score"+score);
            console.log("TIME:"+(millis()-time));
        }
}

function outOfBound(){
    if( (snakeTab[0].getY()==0 && snake.getDirection()==direction.UP) ||
        (snakeTab[0].getY()==height && snake.getDirection()==direction.DOWN) ||
        (snakeTab[0].getX()==0 && snake.getDirection()==direction.LEFT) ||
        (snakeTab[0].getX()==width && snake.getDirection()==direction.RIGHT)
    ){
        return true;
    }

    return false;
}

function initialiserTabJeu(){
    tabJeu = new Array(width/caseSize);
    for(let i = 0; i < tabJeu.length; i++){
        tabJeu[i]=new Array(height/caseSize)
        for(let j = 0; j < tabJeu[i].length; j++){
            tabJeu[i][j]=caseJeu.VOID;
        }
    }

}

function initTabImages(){
    tabImg = new Array(4);
    for(let i = 0; i < tabImg.length; i++){
        tabImg[i]=new Array(4)
        for(let j = 0; j < tabImg[i].length; j++){
            console.log("(i,j)="+i+","+j)
            tabImg[i][j]=imgTete;
            if(i==j){
                if(i%2==0){
                    tabImg[i][j]=imgCorps;
                }else{
                    tabImg[i][j]=imgCorpsH;
                }
            }
        }
    }
    tabImg[0][3]=loadImage("../../resources/imagesSnake/corps/Snake_corpsAngle03.png");
    tabImg[1][2]=loadImage("../../resources/imagesSnake/corps/Snake_corpsAngle03.png");

    tabImg[0][1]=loadImage("../../resources/imagesSnake/corps/Snake_corpsAngle01.png");
    tabImg[3][2]=loadImage("../../resources/imagesSnake/corps/Snake_corpsAngle01.png");

    tabImg[1][0]=loadImage("../../resources/imagesSnake/corps/Snake_corpsAngle10.png");
    tabImg[2][3]=loadImage("../../resources/imagesSnake/corps/Snake_corpsAngle10.png");

    tabImg[2][1]=loadImage("../../resources/imagesSnake/corps/Snake_corpsAngle21.png");
    tabImg[3][0]=loadImage("../../resources/imagesSnake/corps/Snake_corpsAngle21.png");

    initTabTete();
}

function initTabTete(){
    tabTete = new Array(4);
    for(let i = 0; i < tabTete.length; i++){
        tabTete[i]=imgTete;
    }
    tabTete[0]=loadImage("../../resources/imagesSnake/Snake_tete0.png");
    tabTete[1]=loadImage("../../resources/imagesSnake/Snake_tete1.png");
    tabTete[2]=loadImage("../../resources/imagesSnake/Snake_tete2.png");
    tabTete[3]=loadImage("../../resources/imagesSnake/Snake_tete3.png");
    initTabQueue();
}

function initTabQueue(){
    tabQueue = new Array(4);
    for(let i = 0; i < tabQueue.length; i++){
        tabQueue[i]=imgQueue;
    }
    tabQueue[0]=loadImage("../../resources/imagesSnake/Snake_queue0.png");
    tabQueue[1]=loadImage("../../resources/imagesSnake/Snake_queue1.png");
    tabQueue[2]=loadImage("../../resources/imagesSnake/Snake_queue2.png");
    tabQueue[3]=loadImage("../../resources/imagesSnake/Snake_queue3.png");
}

function appleSpawn(){
    do{
        var r1 = parseInt(random(0,tabJeu.length-1));
        var r2 = parseInt(random(0,tabJeu[0].length-1));
    }while(tabJeu[r1][r2]==caseJeu.SNAKE);
    appleX=r1;
    appleY=r2;
    console.log("r1:"+r1);
    console.log("r2:"+r2);
    tabJeu[r1][r2]=caseJeu.APPLE;
}

function grille(){
    for(let i = 0; i < tabJeu.length; i++) {
        for (let j = 0; j < tabJeu[i].length; j++) {
            stroke(255,127,0);
            rect(i*caseSize,j*caseSize,caseSize,caseSize);
            if(tabJeu[i][j]==caseJeu.APPLE){
                image(imgApple,i*caseSize,j*caseSize);
            }
        }
    }
}

function gestionButtons(){

    if(etatActuelJeu==etatJeu.END){
        continueButton.render();
    }else if(etatActuelJeu==etatJeu.START){
        startButton.render();
    }else{
        verifierMort();
    }

}

function draw(){

    background(70);
    grille(); // fond à dessiner, donc en 1er

    text("etatActuelJeu:"+etatActuelJeu.toString(),20,20);
    gestionButtons();
    if(etatActuelJeu==etatJeu.INGAME){
        snake.afficherSnake();
        snake.move();
        snake.drawSnake();
    }
}

class Button {
    constructor(x, y, w, h, s){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.s = s;
    }

    render(){
        push();
        rectMode(CENTER);
        fill(0);
        stroke(255);
        strokeWeight(3);
        rect(this.x, this.y, this.w, this.h);
        strokeWeight(1);
        textAlign(CENTER, CENTER);
        fill(255);
        noStroke();
        text(this.s, this.x, this.y);
        pop();
    }

    isInside(mx, my){
        return mx >= this.x-this.w/2 && mx <= this.x+this.w/2 && my >= this.y-this.h/2 && my <= this.y+this.h/2;
    }
}

function mousePressed(){
    if(etatActuelJeu==etatJeu.START && startButton.isInside(mouseX,mouseY)){
        etatActuelJeu=etatJeu.INGAME;
        time=millis();
    }else if(etatActuelJeu==etatJeu.END && continueButton.isInside(mouseX,mouseY)){
        setupBis();
        etatActuelJeu=etatJeu.START;
    }
}



