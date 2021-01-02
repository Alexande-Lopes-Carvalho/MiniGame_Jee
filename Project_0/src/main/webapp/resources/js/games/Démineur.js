const nbLargeur = 16;
const nbLongueur = 30;
const nbMines = 99; //jeu originale mines: 99  largeur: 16  longueur: 30
const taille = 21;
const nbCase = nbLargeur*nbLongueur ;//nb de case

let firstClick;
let startGame;
let lose;
let win;
let time;
let startTime;
var tabofCase = new Array(nbLongueur);

let imgVide;
let img1;
let img2;
let img3;
let img4;
let img5;
let img6;
let img7;
let img8;
let imgBombe;
let imgNotClicked;
let imgDrapeau;
let imgLogo;
let imgButtonPlay;
let imgButtonReset;

let path = "../../../resources/data/Demineur/";

function preload(){
    imageLoading();
}


function setup() {
    var canvas = createCanvas(614, 400); // dimension a changer en fonction du jeu
    canvas.parent("sketchHolder");
    document.oncontextmenu = function() {
        if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height)
            return false;
    }
    initGrille();
    firstClick = false;
    startGame = false;
    mainMenu();
}

function draw(){ // contenu de la méthode a changer
    if (startGame == true && lose ==false && win == false) {
        background(255);
        drawArray(tabofCase);
        drawButton();
        winGame();
    } else {
        if (lose == true) {
            drawArray(tabofCase);
            fill(255, 0, 0);
            textSize(12);
            text("Game Over: You lose", 384, 380);
        } else {
            if (win == true) {
                drawArray(tabofCase);
                fill(0, 255, 0);
                textSize(12);
                text("Game Over, Your time "+nf(time, 0, 2)+" seconds", 384, 380);
            }
        }
    }
}

function mousePressed() {
    var x =  floor(mouseX/20);
    var y =  floor(mouseY/20);

    if (startGame == true){
        if (mouseButton==LEFT && x>=0 && x<nbLongueur && y>=0 && y<nbLargeur) {
            if (firstClick==false ) {
                tabofCase[x][y].forceSafe = true;
                initSafeZone(x, y);
                initBombe();
                initFigure();
                firstClick=true;
            }

            if (tabofCase[x][y].clicked== false && tabofCase[x][y].marked == false) {
                tabofCase[x][y].clicked = true;
            }
            if (tabofCase[x][y].container == 0) {
                clickOnBubble(x, y);
            }
            if (tabofCase[x][y].container == -1) {
                lose = true;
                loseGame();
            }
        } else {
            if (mouseButton==RIGHT && x>=0 && x<nbLongueur && y>=0 && y<nbLargeur) {
                if (tabofCase[x][y].clicked== false && tabofCase[x][y].marked== false ) {
                    tabofCase[x][y].marked = true;
                } else {
                    if (tabofCase[x][y].clicked== false && tabofCase[x][y].marked== true) {
                        tabofCase[x][y].marked = false;
                    }
                }
            }
        }

        if (mouseButton==LEFT && mouseX>=10 && mouseX<=164 && mouseY<=380 && mouseY>=330) {
            background(189);
            initGrille();
            lose = false;
            win= false;
            firstClick =false;
            startGame = false;
            mainMenu();
        }
    } else {
        if (mouseX>=230 && mouseX<=384 && mouseY<=350 && mouseY>=300) {
            win = false;
            lose = false;
            startGame = true;
            startTime = millis();
        }
    }
}


function clickOnBubble(x,y) {
    for (var i= x-1; i<x+2; i++) {
        for (var j= y-1; j<y+2; j++) {
            if (i>=0 && i<nbLongueur && j>=0 && j<nbLargeur) {
                if (tabofCase[i][j].container == 0 && tabofCase[i][j].clicked == false) {
                    tabofCase[i][j].clicked = true;
                    clickOnBubble(i, j);
                }
            }
        }
    }

    for (var i= x-1; i<x+2; i++) {
        for (var j= y-1; j<y+2; j++) {
            if (i>=0 && i<nbLongueur && j>=0 && j<nbLargeur) {
                if (tabofCase[i][j].clicked == false) {
                    tabofCase[i][j].clicked = true;
                }
            }
        }
    }
}

function initSafeZone(x, y) {
    for (var i= x-1; i<x+2; i++) {
        for (var j= y-1; j<y+2; j++) {
            if (i>=0 && i<nbLongueur && j>=0 && j<nbLargeur && i!=j) {
                tabofCase[i][j].forceSafe = true;
            }
        }
    }
}


function imageLoading() {
    imgVide = load("assets/bubble.png");
    img1 = load("assets/1.png");
    img2 = load("assets/2.png");
    img3 = load("assets/3.png");
    img4 = load("assets/4.png");
    img5 = load("assets/5.png");
    img6 = load("assets/6.png");
    img7 = load("assets/7.png");
    img8 = load("assets/8.png");
    imgBombe = load("assets/bombe.png");
    imgNotClicked = load("assets/noClicked.png");
    imgDrapeau = load("assets/Drapeau.png");
    imgLogo= load("assets/logo.png");
    imgButtonPlay= load("assets/boutonPlay.png");
    imgButtonReset= load("assets/boutonReset.png");
}

function load(p){
    return loadImage(path + p);
}

function initGrille() {
    for(let i = 0; i < nbLongueur; i++){
        tabofCase[i]=new Array(nbLargeur);
        for(let j = 0; j < nbLargeur; j++){
            tabofCase[i][j]=new Case(i*20, j*20); // remplissage tablo
        }
    }
}

function initBombe() {
    var dropped = 0;
    while (dropped < nbMines) {
        var x = Math.floor(Math.random() * nbLongueur);
        var y = Math.floor(Math.random() * nbLargeur);
        if (tabofCase[x][y].container == 0 && tabofCase[x][y].forceSafe == false) {
            tabofCase[x][y].container = -1;
            dropped++;
        }
    }
}

function initFigure() {
    var mines;
    for (var i = 0; i < nbLongueur; i++) {
        for (var j = 0; j < nbLargeur; j++) {
            if (tabofCase[i][j].container!=-1) {
                mines= countMines(i, j);
                tabofCase[i][j].container= mines;
            }
        }
    }
}


function countMines(x, y) {
    var mines = 0;

    for (var i= x-1; i<x+2; i++) {
        for (var j= y-1; j<y+2; j++) {
            if (i>=0 && i<nbLongueur && j>=0 && j<nbLargeur) {
                if (tabofCase[i][j].container==-1) {
                    mines++;
                }
            }
        }
    }
    return mines;
}

function mainMenu() {
    background(189);
    image(imgLogo, 210, 50);
    image(imgButtonPlay, 230, 300);
}

function drawButton() {
    image(imgButtonReset, 10, 330);
}

function loseGame() {
    for (var i = 0; i < nbLongueur; i++) {
        for (var j = 0; j < nbLargeur; j++) {
            if (tabofCase[i][j].container==-1) {
                tabofCase[i][j].clicked= true;
            }
        }
    }
}

function winGame() {
    var nbClicked = 0;
    for (var i = 0; i < nbLongueur; i++) {
        for (var j = 0; j < nbLargeur; j++) {
            if (tabofCase[i][j].container != -1 && tabofCase[i][j].clicked == true) {
                nbClicked++;
            }
        }
    }
    if (nbClicked == nbCase - nbMines) {
        win = true;
        time = (millis() - startTime) / 1000;
        saveScore(currentGameName, time, time*1000);
    }
}


class Case { //caractéristique d'une node


    constructor(x, y) {
    this.x      = x;
    this.y      = y;
    this.container = 0;
    this.clicked = false;
    this.marked = false;
    this.forceSafe = false;

}

    display() {
    if (this.clicked == false) {
        image(imgNotClicked, this.x, this.y);
    }
    if (this.container==-1 && this.clicked == true) {
        image(imgBombe, this.x, this.y);
    }
    if (this.container==0 && this.clicked == true) {
        image(imgVide, this.x, this.y);
    }
    if (this.container==1 && this.clicked == true) {
        image(img1, this.x, this.y);
    }
    if (this.container==2 && this.clicked == true) {
        image(img2, this.x, this.y);
    }
    if (this.container==3 && this.clicked == true) {
        image(img3, this.x, this.y);
    }
    if (this.container==4 && this.clicked == true) {
        image(img4, this.x, this.y);
    }
    if (this.container==5 && this.clicked == true) {
        image(img5, this.x, this.y);
    }
    if (this.container==6 && this.clicked == true) {
        image(img6, this.x, this.y);
    }
    if (this.container==7 && this.clicked == true) {
        image(img7, this.x, this.y);
    }
    if (this.container==8 && this.clicked == true) {
        image(img8, this.x, this.y);
    }
    if (this.marked == true && this.clicked == false){
        image(imgDrapeau, this.x, this.y);
    }

}
}


function drawArray(ar) {
    for (var i = 0; i < nbLongueur; i++) {
        for (var j = 0; j < nbLargeur; j++) {
            ar[i][j].display();
        }
    }
}
