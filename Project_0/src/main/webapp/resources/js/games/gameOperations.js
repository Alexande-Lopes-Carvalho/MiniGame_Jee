var currentGameName;

setupGameOperation();
function setupGameOperation(){
    currentGameName= document.getElementById("gameName").innerHTML;
    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false); // empeche les fleche directionnelle de scroller la page (et donc de descendre monté la page pdt qu'on joue)
    architecture();
    //putDataClassement(currentGameName);
    dataClassementG(currentGameName);
}

function launchSaveScore(){
    //console.log("pass launchSaveScore");
    saveScore(currentGameName, score, time);
}

function saveScore(game, score, time){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "saveScore?game=" + game + "&score=" + score + "&time=" + parseInt(time), true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            refreshPageRanks(game);
        }
    }
}

// appeler à la fin d'une partie
function refreshPageRanks(game){ // rafraichit le classement sur la page utilisateur (A REMPLIR)

    var buttonMondial=document.getElementById("buttonMondial");
    var buttonLocal=document.getElementById("buttonLocal");

    if(buttonMondial.disabled){
        dataClassementG(game);
    }else{
        putDataClassement(game);
    }
    //console.log("refreshPageRanks");
}

function architecture(){
    buttonMondial=document.getElementById("buttonMondial").disabled = true;
    //var set = document.getElementById('buttons');
    //set.innerHTML = "<button id=\"buttonLocal\" onclick=\"changerRank(0)\">Classement local</button> <button id=\"buttonMondial\" onclick=\"changerRank(1)\" disabled>Classement mondial</button>";
}

function changerRank(num){
    var buttonMondial=document.getElementById("buttonMondial");
    var buttonLocal=document.getElementById("buttonLocal");

    if(num===0){ // localBool indique sur quel bouton on a cliqué
        buttonLocal.disabled = true;
        buttonMondial.disabled = false;
        //set.innerHTML = "Classement Local";
        putDataClassement(currentGameName);
    }else{
        buttonMondial.disabled = true;
        buttonLocal.disabled = false;
        //set.innerHTML = "Classement Mondial";
        dataClassementG(currentGameName);
    }
}

function putDataClassement(game){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "localRank?gamename="+game, true); //  @RequestMapping("/localRank") affiche les scores
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            document.getElementById("classement").innerHTML = httpRequest.responseText;
        }
    }
}

function dataClassementG(game){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "globalRank?gamename="+game, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            document.getElementById("classement").innerHTML = httpRequest.responseText;
        }
    }
}
