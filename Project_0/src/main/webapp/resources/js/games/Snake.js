

function setup() {
    var canvas = createCanvas(400, 400); // dimension a changer en fonction du jeu
    canvas.parent("sketchHolder");
    // ecrire suite du setup si necessaire
}

function draw(){ // contenu de la méthode a changer
    background( (((millis()/2000)%2 < 1)? ((millis()%2000)/2000.) : (1-((millis()%2000)/2000.)))*150+50);
}