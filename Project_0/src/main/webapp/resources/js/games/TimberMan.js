// Modifiable
const PIXEL = 6;
const WIDTH = 100, HEIGHT = 100; // dimension de la fenetre en unité de PIXEL
const BRANCH_PROBABILITY = 0.4; // probabilité d'apparition de branche (sachant qu'il y a obligatoirement deux troncons d'espace entre les branches)
const NOT_SAME_BRANCH_PROBABILITY = 0.6; // probabilité d'obtenir une branche orienté differemment de la derniere branche non coupé presente sur l'arbre
const CUTTED_LOG_LIMIT = 10; // nb de troncons coupé affichable a l'ecran
const LOG_SPEED = 0.1; // en PIXEL par milliseconde
const LEVEL = 20; // Nombre de buche a coupé pour passer un niveau
const MIN_SPEED = 100/10000, MAX_SPEED = 20/300; // en point par milliseconde (une barre = 100pts)
const LEVEL_FOR_MAX_SPEED = 10; // indique le nb de level pour avec la vitesse max
const GAIN_PER_CUT = 10; // indique le gain sur le timer a chaque buche couper

// Non modifiable
const CLOSER_TO = (((Math.tanh((375+86)*0.006)-Math.tanh(86*0.006))/(1-Math.tanh(86*0.006))));

const SCREEN = {
    START:"start",
    GAME:"game",
    ENDGAME:"endgame"
};
const ORIENTATION = {
    RIGHT:0,
    LEFT:1
};
const ANIMATION = {
    NEUTRAL:0,
    CUTTING:1
};
const CONTROLS = {
    KEYBOARD:0,
    MOUSE:1
}

let currentScreen;

let decor, decorBack;
let mainTree;
let axe;
let characterImage;
let logImage;
let branchImage;

let timerImage;
let numbersImage;
let numbersImages;
let graveImages;
let scoreImage;
let startImage;
let continueImage;
let playWithImage;
let outOfTimeImage;

let path = "../../../resources/data/TimberMan/";

let screenModeRequest;
let screenDrawable;
let points;
let time;

function preload(){
    decor = load("./decor.png");
    decorBack = load("./decorBack.png");
    mainTree = load("./mainTree.png");
    axe = load("./axe.png");
    characterImage = new Array(2);
    for(let i = 0; i < characterImage.length; i++){
        characterImage[i] = new Array(load("./character/" + i + ".png"), null);
    }
    logImage = new Array(3);
    for(let i = 0; i < logImage.length; i++){
        logImage[i] = load("./log/" + i + ".png");
    }
    branchImage = new Array(2);
    branchImage[0] = load("./branch.png");
    graveImages = new Array(2);
    graveImages[0] = load("./grave.png");

    timerImage = new Array(2);
    for(let i = 0; i < timerImage.length; i++){
        timerImage[i] = load("./timer/" + i + ".png");
    }
    startImage = load("./start.png");
    numbersImage = load("./numbers.png");
    scoreImage = load("./score.png");
    continueImage = load("./continue.png");
    playWithImage = load("./playWith.png");
    outOfTimeImage = load("./outOfTime.png");
}

function setup() {
    var canvas = createCanvas(WIDTH*PIXEL, HEIGHT*PIXEL);
    canvas.parent("sketchHolder");

    document.oncontextmenu = function() {
        if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height)
            return false;
    }

    decor = resizePixelatedImage(decor, PIXEL);
    decorBack = resizePixelatedImage(decorBack, PIXEL);
    mainTree = resizePixelatedImage(mainTree, PIXEL);
    axe = resizePixelatedImage(axe, PIXEL);
    for(let i = 0; i < characterImage.length; i++){
        characterImage[i][1] = reverseImage(characterImage[i][0]);
    }
    for(let i = 0; i < characterImage.length; i++){
        resizePixelatedImageArray(characterImage[i], PIXEL);
    }
    resizePixelatedImageArray(logImage, PIXEL);
    branchImage[1] = reverseImage(branchImage[0]);
    resizePixelatedImageArray(branchImage, PIXEL);
    graveImages[1] = reverseImage(graveImages[0]);
    resizePixelatedImageArray(graveImages, PIXEL);

    resizePixelatedImageArray(timerImage, 6);
    outOfTimeImage = resizePixelatedImage(outOfTimeImage, 6);
    startImage = resizePixelatedImage(startImage, 3);
    numbersImages = new Map();
    numbersImages.set(1, loadNumbers(numbersImage));
    numbersImages.set(3, resizePixelatedImageArray([...numbersImages.get(1)], 3));
    numbersImages.set(14, resizePixelatedImageArray([...numbersImages.get(1)], 14));
    scoreImage = resizePixelatedImage(scoreImage, 3);
    continueImage = resizePixelatedImage(continueImage, 3);
    playWithImage = resizePixelatedImage(playWithImage, 3);

    screenDrawable = new Map();
    screenDrawable.set(SCREEN.START, new Array(new StartButton(),
                                               new ImagePx(axe, WIDTH/2-1, HEIGHT-32-axe.height/PIXEL),
                                               new ImagePx(decorBack, WIDTH / 2 - (decorBack.width / 2) / PIXEL, HEIGHT - decorBack.height / PIXEL),
                                               new ImagePx(playWithImage, WIDTH/2-(playWithImage.width/2)/PIXEL, HEIGHT-13-playWithImage.height/PIXEL)));

    let character = new Character(characterImage, 14.5, HEIGHT-22-(characterImage[0][0].height/2)/PIXEL);
    let tree = new Tree();
    tree.setCharacter(character);
    character.setTree(tree);
    let timer = new Timer(timerImage, width/2, (8/400)*height+timerImage[0].height/2);
    tree.setTimer(timer);
    screenDrawable.set(SCREEN.GAME, new Array(tree,
                                              character,
                                              timer,
                                              new Score(width/2,height-72*PIXEL, 3, CENTER),
                                              new ImagePx(decorBack, WIDTH / 2 - (decorBack.width / 2) / PIXEL, HEIGHT - decorBack.height / PIXEL)));

    screenDrawable.set(SCREEN.ENDGAME, new Array(tree,
                                                 new Grave(graveImages, 10, HEIGHT-20-graveImages[0].height/PIXEL, character),
                                                 new Score((24/400)*height, height-(24/400)*height-14*5, 14, CORNER),
                                                 new ImagePx(scoreImage, ((24/400)*height)/PIXEL, (height-(24/400)*height-14*5-5-3*5)/PIXEL),
                                                 new OutOfTime(timer),
                                                 new ContinueButton()));

    screenModeRequest = new Array();
    setScreenMode(SCREEN.START);
}

function draw(){ // contenu de la méthode a changer
    background(0);
    imagePx(decor, WIDTH/2-(decor.width/2)/PIXEL, HEIGHT-decor.height/PIXEL);
    imagePx(mainTree, WIDTH/2-(mainTree.width/2)/PIXEL, HEIGHT-33);
    for(const k of screenDrawable.get(currentScreen)){
        k.calc(deltaTime);
        k.render();
    }
    for(;screenModeRequest.length != 0;){
        setScreenMode(screenModeRequest.shift());
    }
}

function mousePressed(){
    //console.log(mouseButton);
    for(const k of screenDrawable.get(currentScreen)){
        k.mousePressed(mouseButton, mouseX, mouseY);
    }
}

function mouseReleased(){
    //console.log(mouseButton);
    for(const k of screenDrawable.get(currentScreen)){
        k.mouseReleased(mouseButton, mouseX, mouseY);
    }
}

function keyPressed(){
    for(const k of screenDrawable.get(currentScreen)){
        k.keyPressed(keyCode);
    }
}

function keyReleased(){
    for(const k of screenDrawable.get(currentScreen)){
        k.keyReleased(keyCode);
    }
}

function startingScreen(){
}

function gamingScreen(){
    points = 0;
    time = millis();
}

function endingScreen(){
    time = millis()-time;
    saveScore(currentGameName, points, time);
}

function setScreenMode(value){
    if(value == SCREEN.START){
        startingScreen();
        currentScreen = SCREEN.START;
    } else if(value == SCREEN.GAME) {
        gamingScreen();
        currentScreen = SCREEN.GAME;
    } else if(value == SCREEN.ENDGAME) {
        endingScreen();
        currentScreen = SCREEN.ENDGAME;
    } else {
        return;
    }
    for(const k of screenDrawable.get(currentScreen)){
        k.reset();
    }
}

function getLevel(){
    return 1+Math.floor(points/LEVEL);
}

function load(p){
    return loadImage(path + p);
}

function imagePx(img, x, y){
    image(img, int(x*PIXEL), int(y*PIXEL));
}

function translatePx(x, y){
    translate(x*PIXEL, y*PIXEL);
}

function resizePixelatedImageArray(img, pixel){
    for(let i = 0; i < img.length; i++){
        img[i] = resizePixelatedImage(img[i], pixel);
    }
    return img;
}

function resizePixelatedImage(img, pixel){
    pixel = int(pixel);
    //console.log(img.width + " " + img.height);
    let res = createImage(img.width*pixel, img.height*pixel);
    //console.log(res.width + " " + res.height);
    img.loadPixels();
    res.loadPixels();
    //console.log(img.pixels);
    for(let i = 0; i < img.pixels.length/4 ;i++){
        //console.log("px : " + Math.floor((i)%(img.width)) + " " + Math.floor(i/int(img.width)));
        let co = new Array(4);
        for(let j = 0; j < 4; j++){
            co[j] = img.pixels[i*4+j];
        }

        for(let j = 0; j < pixel*pixel; j++){
            for(let l = 0; l < co.length; l++){
                res.pixels[Math.floor(i%img.width)*4*pixel+Math.floor(i/img.width)*res.width*4*pixel+Math.floor(j%pixel)*4+Math.floor(j/pixel)*res.width*4+l] = co[l];
            }
        }

    }
    res.updatePixels();
    return res;
}

function reverseImage(img){
    let res = createImage(img.width, img.height);
    img.loadPixels();
    res.loadPixels();
    for(let i = 0; i < res.pixels.length/4; i++){
        for(let j = 0; j < 4; j++){
            res.pixels[i*4+j] = img.pixels[((img.width-1)-Math.floor(i%img.width))*4+Math.floor(i/img.width)*img.width*4+j];
        }
    }
    res.updatePixels();
    return res;
}

function loadNumbers(img){
    let res = new Array(10);
    for(let i = 0; i < res.length; i++){
        //console.log(i);
        let v = createImage(5, img.height);
        img.loadPixels();
        v.loadPixels();
        for(let j = 0; j < v.pixels.length/4; j++){
            for(let l = 0; l < 4; l++){
                v.pixels[j*4+l] = img.pixels[i*4*v.width + Math.floor(j%v.width)*4 + Math.floor(j/v.width)*img.width*4+l];
            }
        }
        v.updatePixels();
        res[i] = v;
    }
    return res;
}

function drawNumbers(txt, size, x, y){
    translate(parseInt(x), parseInt(y));
    for(let i = 0; i < txt.length; i++){
        let v = txt.charCodeAt(i)-48;
        if(v >= 0 && v <= 9){
            image(numbersImages.get(size)[v], i*5*size, 0);
        }
    }
    translate(-parseInt(x), -parseInt(y));
}

class Drawable { // Interface
    reset(){}
    render(){}
    calc(timePassed){}
    mousePressed(mouseButton, mouseX, mouseY){}
    mouseReleased(mouseButton, mouseX, mouseY){}
    keyPressed(keyCode){}
    keyReleased(keyCode){}
}

class Tree extends Drawable {
    constructor() {
        super();
        this.x = WIDTH/2;
        this.y = HEIGHT-37;
        this.character = null;
    }
    reset() {
        if(currentScreen == SCREEN.GAME) {
            //console.log("tree do reset");
            this.logQueue = new Array();
            this.cuttedLogQueue = new Array();
            this.putLog();
        }
    }
    putLog(){
        for(;/*this.y-(logImage[0].height/PIXEL)*this.logQueue.length*/((this.logQueue.length > 0)? this.logQueue[this.logQueue.length-1].getY()-(logImage[0].height/2)/PIXEL : this.y) > 0;){
            this.logQueue.push(this.createLog());
        }
    }
    createLog(){
        let y = (this.logQueue.length > 0)? this.logQueue[this.logQueue.length-1].getY()-logImage[0].height/PIXEL : this.y;
        if(this.logQueue.length > 1 && !this.logQueue[this.logQueue.length-1].hasBranch() && !this.logQueue[this.logQueue.length-2].hasBranch() && random() < BRANCH_PROBABILITY){
            let lastBranch = null;
            for(let i = this.logQueue.length-3; i >= 0; i--){
                if(this.logQueue[i].hasBranch()) {
                    lastBranch = this.logQueue[i];
                    let same = lastBranch.getBranchOrientation();
                    let other = (lastBranch.getBranchOrientation() == ORIENTATION.RIGHT)? ORIENTATION.LEFT : ORIENTATION.RIGHT;
                    return new LogWithBranch(this.logQueue.length+points, this.x, y, (random() <= NOT_SAME_BRANCH_PROBABILITY)? other : same);
                }
            }
            return new LogWithBranch(this.logQueue.length+points, this.x, y, (random([0, 1]) == 1)? ORIENTATION.RIGHT : ORIENTATION.LEFT);
        } else {
            return new Log(this.logQueue.length+points, this.x, y);
        }
        /*if(this.logQueue.length > 1 && !this.logQueue[this.logQueue.length-1].hasBranch() && random() < BRANCH_PROBABILITY){
            return new LogWithBranch(this.logQueue.length+points, this.x, this.y-this.logQueue.length*logImage[0].height/PIXEL, (random([0, 1]) == 1)? ORIENTATION.RIGHT : ORIENTATION.LEFT);
        } else {
            return new Log(this.logQueue.length+points, this.x, this.y-this.logQueue.length*logImage[0].height/PIXEL);
        }*/
    }
    calc(timePassed) {
        for(const k of this.cuttedLogQueue) {
            k.calc(timePassed);
        }
        for(;this.cuttedLogQueue.length > 0 && this.cuttedLogQueue[0].canRemove();){
            this.cuttedLogQueue.shift();
        }
        let addY = (this.logQueue.length > 0 && this.logQueue[0].getY() != this.y)? min(LOG_SPEED*timePassed, this.y-this.logQueue[0].getY()) : 0;
        let headCoord = this.character.getHeadCoord();
        for(const k of this.logQueue) {
            k.setY(k.getY()+addY);
        }
        if(currentScreen == SCREEN.GAME && this.checkCollision()){
            screenModeRequest.push(SCREEN.ENDGAME);
        }
        this.putLog();
    }

    render() {
        for(const k of this.logQueue){
            k.render();
        }
        for(const k of this.cuttedLogQueue){
            k.render();
        }
        /*for(let i = this.logQueue.length-1; i >= 0; i--){
            let k = this.logQueue[i];
            text(((k.hasBranch() && k.getBranchOrientation() == ORIENTATION.LEFT)? "--" : "  ") + "[]"+ ((k.hasBranch() && k.getBranchOrientation() == ORIENTATION.RIGHT)? "--" : ""), 5, 10*(this.logQueue.length-1-i+1));
        }*/
    }

    setCharacter(c){
        this.character = c;
    }

    setTimer(timer){
        this.timer = timer;
    }

    cut(){
        if(this.checkCollision()){
            screenModeRequest.push(SCREEN.ENDGAME);
            return;
        } else if(this.logQueue.length > 0 && this.logQueue[0].getY() > this.y - (logImage[0].height/2)/PIXEL) {
            points++;
            let l = this.logQueue.shift();
            this.cuttedLogQueue.push(l);
            for (; this.cuttedLogQueue.length > CUTTED_LOG_LIMIT;) {
                this.cuttedLogQueue.shift();
            }
            l.cut(this.character.getOrientation());
            this.timer.cut();
            this.putLog();
        }
    }

    checkCollision(){
        let headCoord = this.character.getHeadCoord();
        for(const k of this.logQueue) {
            if (k.collision(this.character.getOrientation(), headCoord)) {
                return true;
            }
        }
        return false;
    }
}

class Log extends Drawable {
    constructor(i, x, y){
        super();
        this.img = logImage[i%logImage.length];
        this.x = x;
        this.y = y;
        this.r = 0;
        this.isCutted = false;
        this.removable = false;
    }

    calc(timePassed){
        if(this.isCutted){
            this.timeCount += timePassed;
            this.r += this.mult*this.rotSpeed*timePassed;
            let xPoint = this.timeCount*this.speed;
            this.x = this.startX+xPoint*this.mult;
            this.y = this.startY+(sq(xPoint)*this.a+(xPoint)*this.b);
            let v = sqrt(sq(this.img.width/2)+sq(this.img.height/2));
            this.removable = !(this.x+v >= 0 && this.x-v < WIDTH);
        }
    }

    render(){
        push();
        translatePx(this.x, this.y);
        rotate(this.r);
        this.renderImage();
        rotate(-this.r);
        translatePx(-this.x, -this.y);
        pop();
    }
    renderImage(){
        image(this.img, -this.img.width/2, -this.img.height/2);
    }
    canRemove(){
        return this.removable;
    }
    setX(x){
        this.x = x;
    }
    setY(y){
        this.y = y;
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    cut(orientation) {
        this.isCutted = true;
        this.rotSpeed = random(0.001, 0.001);
        this.a = 8/625 + random(-0.005, 0.009);
        this.b = -16/25;
        this.startX = this.x;
        this.startY = this.y;
        this.speed = 0.16;
        this.timeCount = 0;
        this.mult = 1;
        if(orientation == ORIENTATION.RIGHT){
            this.mult *= -1;
        }
    }

    collision(orientation, headY){
        if(orientation == ORIENTATION.RIGHT){
            return this.rightSideCollision(headY);
        } else {
            return  this.leftSideCollision(headY);
        }
    }

    leftSideCollision(headY){
        return false;
    }
    rightSideCollision(headY){
        return false;
    }
    hasBranch(){
        return false;
    }
    getBranchOrientation(){
        return null;
    }
}

class LogWithBranch extends Log {
    constructor(i, x, y, orientation) {
        super(i, x, y);
        this.branchOrientation = orientation;
    }
    renderImage() {
        super.renderImage();
        if(this.branchOrientation == ORIENTATION.RIGHT){
            imagePx(branchImage[0], 3, (-branchImage[0].height/2)/PIXEL);
        } else {
            imagePx(branchImage[1], -3-branchImage[1].width/PIXEL, (-branchImage[1].height/2)/PIXEL);
        }
    }
    leftSideCollision(headY){
        return (this.branchOrientation == ORIENTATION.LEFT && this.y > headY)? true : false;
    }
    rightSideCollision(headY){
        return (this.branchOrientation == ORIENTATION.RIGHT && this.y > headY)? true : false;
    }
    hasBranch(){
        return true;
    }
    getBranchOrientation(){
        return this.branchOrientation;
    }
}

class Character extends Drawable {
    constructor(img, x, y) {
        super();
        this.img = img;
        this.middle = WIDTH/2;
        this.x = x;
        this.y = y;
        this.animation = ANIMATION.NEUTRAL;
        this.orientation = ORIENTATION.RIGHT;
        this.cuttingDelay = -1;
        this.tree = null;
        this.controls = -1;
    }

    reset(){
        this.animation = ANIMATION.NEUTRAL;
        this.orientation = ORIENTATION.RIGHT;
    }

    calc(timePassed) {
        if(this.cuttingDelay >= 0){
            this.cuttingDelay -= timePassed;
            if(this.cuttingDelay < 0){
                this.setCut(false);
            }
        }
    }

    render() {
        push();
        imageMode(CENTER);
        imagePx(this.img[this.animation][this.orientation], this.middle+((this.orientation == 0)? 1 : -1)*this.x, this.y);
        pop();
    }

    setTree(t) {
        this.tree = t;
    }

    setCut(v){
        if(v){
            this.animation = ANIMATION.CUTTING;
            this.cuttingDelay = 100;
            this.tree.cut();
        } else {
            this.animation = ANIMATION.NEUTRAL;
            this.cuttingDelay = -1;
        }
    }

    getHeadCoord(){ // from ground
        return this.y-(this.img[this.animation][this.orientation].height/2)/PIXEL+((this.animation == ANIMATION.CUTTING)? 1: 0);
    }

    getOrientation(){
        return this.orientation;
    }

    mousePressed(mouseButton, mouseX, mouseY) {
        //console.log("press " + mouseButton);
        this.controls = CONTROLS.MOUSE;
        if(mouseButton == RIGHT){
            this.orientation = ORIENTATION.RIGHT;
            this.setCut(true);
        } else if(mouseButton == LEFT){
            this.orientation = ORIENTATION.LEFT;
            this.setCut(true);
        }
    }

    mouseReleased(mouseButton, mouseX, mouseY) {
        //console.log("released " + mouseButton);
        // INCONSISTENCY WITH mouseButton WHEN TWO BUTTONS ARE PRESSED => NO FIX KNOWN
        if(this.controls == CONTROLS.MOUSE && ((this.orientation == ORIENTATION.RIGHT && mouseButton == RIGHT) || (this.orientation == ORIENTATION.LEFT && mouseButton == LEFT))){
            this.setCut(false);
        }
    }

    keyPressed(keyCode) {
        this.controls = CONTROLS.KEYBOARD;
        if(keyCode == RIGHT_ARROW){
            this.orientation = ORIENTATION.RIGHT;
            this.setCut(true);
        } else if(keyCode == LEFT_ARROW){
            this.orientation = ORIENTATION.LEFT;
            this.setCut(true);
        }
    }

    keyReleased(keyCode) {
        if(this.controls == CONTROLS.KEYBOARD && ((this.orientation == ORIENTATION.RIGHT && keyCode == RIGHT_ARROW) || (this.orientation == ORIENTATION.LEFT && keyCode == LEFT_ARROW))) {
            this.setCut(false);
        }
    }
}

class Timer extends Drawable {
    constructor(img, x, y) {
        super();
        this.img = img;
        this.objX = 0;
        this.objY = y;
        this.x = x;
        this.y = 0;
        this.duration = 200;
    }

    reset() {
        this.value = 50;
        this.timeCount = 0;
        this.currentX = this.x;
        this.currentY = this.y;
        this.start = false;
    }

    init(){
        this.start = true;
    }

    position(){
        return this.start;
    }

    cut(){
        if(!this.start) {
            this.init();
        }
        this.value = min(100, this.value+GAIN_PER_CUT);
    }

    calc(timePassed) {
        this.timeCount += timePassed;
        let t = min(this.duration, this.timeCount+timePassed);
        this.currentX = this.x+this.objX*( ( (Math.tanh( ( (t/ (this.duration) )*375+86)*0.006 ) -Math.tanh(86*0.006) ) / (1-Math.tanh(86*0.006)) ) / CLOSER_TO );
        this.currentY = this.y+this.objY*( ( (Math.tanh( ( (t/ (this.duration) )*375+86)*0.006 ) -Math.tanh(86*0.006) ) / (1-Math.tanh(86*0.006)) ) / CLOSER_TO );
        if(this.start) {
            this.value -= this.getSpeed() * timePassed;
            if (this.value < 0) {
                screenModeRequest.push(SCREEN.ENDGAME);
            }
            //console.log(this.getSpeed());
        }
    }

    getSpeed(){
        return MIN_SPEED+(min(getLevel()-1, LEVEL_FOR_MAX_SPEED-1)/(LEVEL_FOR_MAX_SPEED-1))*(MAX_SPEED-MIN_SPEED);
    }

    render() {
        push();
        imageMode(CENTER);
        image(this.img[0], this.currentX, this.currentY);
        noStroke();
        fill(61, 145, 207);
        rect(this.currentX-(this.img[1].width/2), this.currentY-(this.img[1].height/2), Math.floor(this.img[1].width*(this.value/100)), (this.img[1].height/4)*3);
        image(this.img[1], this.currentX, this.currentY);
        pop();
    }

    getValue(){
        return this.value;
    }
}

class ImagePx extends Drawable {
    constructor(img, x, y) {
        super();
        this.img = img;
        this.x = x;
        this.y = y;
    }
    render(){
        imagePx(this.img, this.x, this.y);
    }
}

class Button extends Drawable {
    constructor(img, x, y) {
        super();
        this.img = img;
        this.objX = 0;
        this.objY = height*0.05;
        this.x = x-this.objX;
        this.y = y-this.objY;
        this.currentX = this.x;
        this.currentY = this.y;
        this.timeCount = 0;
        this.duration = 200;
    }

    reset(){
        this.currentY = this.y;
        this.currentX = this.x;
        this.timeCount = 0;
    }

    calc(timePassed){
        this.timeCount = min(this.duration, this.timeCount+timePassed);
        this.currentX = this.x+this.objX*( ( (Math.tanh( ( (this.timeCount/ (this.duration) )*375+86)*0.006 ) -Math.tanh(86*0.006) ) / (1-Math.tanh(86*0.006)) ) / CLOSER_TO );
        this.currentY = this.y+this.objY*( ( (Math.tanh( ( (this.timeCount/ (this.duration) )*375+86)*0.006 ) -Math.tanh(86*0.006) ) / (1-Math.tanh(86*0.006)) ) / CLOSER_TO );
    }

    render(){
        push();
        image(this.img, parseInt(this.currentX-this.img.width/2), parseInt(this.currentY-this.img.height/2));
        pop();
    }

    isInside(mx, my){
        return mx >= this.currentX-this.img.width/2 && mx <= this.currentX+this.img.width/2 && my >= this.currentY-this.img.height/2 && my <= this.currentY+this.img.height/2;
    }

    action(){
    }

    mousePressed(mouseButton, mouseX, mouseY){
        //console.log(this.isInside(mouseX, mouseY));
        if(this.isInside(mouseX, mouseY)){
            this.action();
        }
    }
}

class StartButton extends Button {
    constructor() {
        super(startImage, width/2, height/2);
    }
    action() {
        screenModeRequest.push(SCREEN.GAME);
    }
}

class ContinueButton extends Button {
    constructor() {
        super(continueImage, width/2, height/2);
    }
    action() {
        screenModeRequest.push(SCREEN.START);
    }
}

class OutOfTime extends Button {
    constructor(timer) {
        super(outOfTimeImage, width/2, (8/400)*height+outOfTimeImage.height/2);
        this.timer = timer;
    }
    render() {
        if(this.timer.getValue() < 0) {
            super.render();
        }
    }
}

class Score extends Drawable {
    constructor(x, y, size, mode) {
        super();
        this.x = x;
        this.y = y;
        this.size = size;
        this.mode = mode;
    }
    render() {
        let s = points+"";
        if(this.mode == CENTER) {
            drawNumbers(s, this.size, this.x - ((s.length * 5 - 1) / 2) * this.size -((s.length > 0 && s.charCodeAt(0) == 49)? (3/2)*this.size: 0), this.y - (5 / 2) * this.size);
        } else if(this.mode == CORNER){
            drawNumbers(s, this.size, this.x - ((s.length > 0 && s.charCodeAt(0) == 49)? 3*this.size: 0), this.y);
        }
    }
}

class Grave extends Drawable {
    constructor(img, x, y, character) {
        super();
        this.img = img;
        this.x = x;
        this.y = y;
        this.character = character;
    }
    render() {
        if(this.character.getOrientation() == ORIENTATION.RIGHT){
            imagePx(this.img[0], WIDTH/2+this.x, this.y);
        } else {
            imagePx(this.img[1], WIDTH/2-this.x-this.img[1].width/PIXEL, this.y);
        }
    }
}