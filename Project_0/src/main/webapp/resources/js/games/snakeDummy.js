const GAMEARRAY = 20;
const REFRESH_RATE = 7;

const screen = {
    START:"start",
    GAME:"game",
    ENDGAME:"endgame"
};

const cell = {
    VOID:"void",
    SNAKE:"snake",
    APPLE:"apple"
}

var currentScreen;
var startButton, continueButton;

var cellSize;

var gameArray;
var snake;

var score;
var time;

function setup() {
    currentGameName = "snakeDummy";
    var canvas = createCanvas(400, 400);
    canvas.parent("sketchHolder");
    frameRate(60);
    setScreenMode(screen.START);
    startButton = new Button(width/2, height/2, 60, 20, "Start");
    continueButton = new Button(width/2, height*0.75, 90, 20, "Continue");
    cellSize = Math.floor((min(width, height)-50)/GAMEARRAY);
}

function draw() {
    if(currentScreen == screen.START){
        background(0);
        startButton.render();
        push();
        textAlign(CENTER, CENTER);
        fill(255);
        noStroke();
        textSize(30);
        text("play with ←↑↓→", width/2, height-100);
        pop();
    } else if(currentScreen == screen.GAME){
        background(40);
        snake.calc();
        push();
        fill(0);
        stroke(40);
        for(var i = 0; i < gameArray.length; i++){
            for(var j = 0; j < gameArray[i].length; j++){
                fill((gameArray[i][j] == cell.APPLE)? color(255, 0, 0) : (gameArray[i][j] == cell.SNAKE)? color(255) : color(0));
                rect(width/2+(i-gameArray.length/2.)*cellSize, height/2+(j-gameArray[i].length/2.)*cellSize, cellSize, cellSize);
            }
        }
        pop();
    }else if(currentScreen == screen.ENDGAME){
        background(0);
        continueButton.render();
        push();
        textAlign(CENTER, CENTER);
        fill(255);
        noStroke();
        textSize(30);
        text("Your score : " + score, width/2, height/2);
        pop();
    }
}

function mousePressed(){
    if(currentScreen == screen.START && startButton.isInside(mouseX, mouseY)){
        setScreenMode(screen.GAME);
    } else if(currentScreen == screen.ENDGAME && continueButton.isInside(mouseX, mouseY)){
        setScreenMode(screen.START);
    }
}

function keyPressed(){
    if(currentScreen == screen.GAME){
        snake.updateDirection(keyCode);
    }
}

function setScreenMode(s){
    if(s == screen.START){
        currentScreen = s;
    } else if(s == screen.GAME){
        currentScreen = s;
        gameArray = new Array(GAMEARRAY);
        for(var i = 0; i < gameArray.length; i++){
            gameArray[i] = new Array(GAMEARRAY);
        }
        gameArray[Math.floor(GAMEARRAY*.75)][Math.floor(GAMEARRAY/2.)] = cell.APPLE;
        snake = new Snake();
        time = millis();
    } else if(s == screen.ENDGAME){
        time = millis()-time;
        currentScreen = s;
        score = snake.q.length-3;
    }
}

function endGame(){
    setScreenMode(screen.ENDGAME);
    launchSaveScore();
}

function spawnApple(){
    var a = [];
    for(var i = 0; i < gameArray.length; i++){
        for(var j = 0; j < gameArray[i].length; j++){
            if(gameArray[i][j] == cell.VOID){
                a.push([i, j]);
            }
        }
    }
    if(a.length != 0){
        var p = a[int(random(0, a.length-1))];
        gameArray[p[0]][p[1]] = cell.APPLE;
    } else {
        endGame();
    }
}

const direction = {
    UP : "up",
    RIGHT : "right",
    DOWN : "down",
    LEFT : "left"
}

class Snake {
    constructor(){
        this.q = [];
        this.addPosition([1, Math.floor(GAMEARRAY/2)]);
        this.addPosition([2, Math.floor(GAMEARRAY/2)]);
        this.addPosition([3, Math.floor(GAMEARRAY/2)]);
        this.d = direction.RIGHT;
        this.nd = this.d;
        this.eat = false;
        this.calcRate = 0;
    }

    calc(){
        this.calcRate++;
        if(this.calcRate%REFRESH_RATE == 0){
            var pos = [this.q[this.q.length-1][0], this.q[this.q.length-1][1]];
            //print()
            this.ld = this.d;
            if(this.d == direction.UP){
                pos[1]--;
            } else if(this.d == direction.RIGHT){
                pos[0]++;
            } else if(this.d == direction.DOWN){
                pos[1]++;
            } else if(this.d == direction.LEFT){
                pos[0]--;
            }
            //print("after " + pos);
            if(!this.addPosition(pos)){
                return;
            }
            this.remove();
        }
        //print(this.q);
    }

    remove(){
        if(!this.eat){
            var pos = this.q.shift();
            gameArray[pos[0]][pos[1]] = cell.VOID;
        }
        this.eat = false;
    }

    addPosition(pos){
        if(pos[0] >= 0 && pos[0] < GAMEARRAY && pos[1] >= 0 && pos[1] < GAMEARRAY){
            this.q.push(pos);
            if(gameArray[pos[0]][pos[1]] == cell.APPLE){
                this.eat = true;
                spawnApple();
            } else if(gameArray[pos[0]][pos[1]] == cell.SNAKE){
                endGame();
                return false;
            }
            gameArray[pos[0]][pos[1]] = cell.SNAKE;
        } else {
            endGame();
            return false;
        }
        return true;
    }

    getOpposite(dir) {
        if(dir == direction.DOWN){
            return direction.UP;
        } else if(dir == direction.UP){
            return direction.DOWN;
        } else if(dir == direction.RIGHT){
            return direction.LEFT;
        } else if(dir == direction.LEFT){
            return direction.RIGHT;
        }
    }

    setDirection(dir){
        if(dir == direction.DOWN || dir == direction.LEFT || dir == direction.UP || dir == direction.RIGHT){
            if(this.getOpposite(this.ld) != dir){
                this.d = dir;
            }
        }
    }

    updateDirection(k){
        if(k == UP_ARROW){
            this.setDirection(direction.UP);
        } else if(k == RIGHT_ARROW){
            this.setDirection(direction.RIGHT);
        } else if(k == DOWN_ARROW){
            this.setDirection(direction.DOWN);
        } else if(k == LEFT_ARROW){
            this.setDirection(direction.LEFT);
        }
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
        noFill();
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