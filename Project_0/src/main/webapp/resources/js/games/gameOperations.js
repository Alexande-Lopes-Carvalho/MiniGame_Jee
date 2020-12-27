function setupGameOperation(game){
    architecture();
    putDataClassement(game);
    dataClassementG(game);
}
setupGameOperation("snakeDummy");


function saveScore(game, score, time){
    httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "saveScore?game=" + game + "&score=" + parseInt(score) + "&time=" + parseInt(time), true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            refreshPageRanks(game);
        }
    }
}

// appeler à la fin d'une partie
function refreshPageRanks(game){ // rafraichit le classement sur la page utilisateur (A REMPLIR)
    // ...
    putDataClassement(game);
    dataClassementG(game);
    console.log("refreshPageRanks");
}

function architecture(){
    var set = document.getElementById('buttons');
    set.innerHTML = "<button id=\"buttonLocal\" onclick=\"changerRank(0)\">Classement local</button> <button id=\"buttonMondial\" onclick=\"changerRank(1)\" disabled>Classement mondial</button>";

}

function changerRank(num){
    var buttonMondial=document.getElementById("buttonMondial");
    var buttonLocal=document.getElementById("buttonLocal");

    if(num===0){ // localBool indique sur quel bouton on a cliqué
        buttonLocal.disabled = true;
        buttonMondial.disabled = false;
        //set.innerHTML = "Classement Local";
        putDataClassement("snakeDummy");
    }else{
        buttonMondial.disabled = true;
        buttonLocal.disabled = false;
        //set.innerHTML = "Classement Mondial";
        dataClassementG("snakeDummy");
    }
}

function putDataClassement(game){
    httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "localRank?gamename="+game, true); //  @RequestMapping("/localRank") affiche les scores
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            document.getElementById("classement").innerHTML = httpRequest.responseText;
        }
    }
}

function dataClassementG(game){
    httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "globalRank?gamename="+game, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            document.getElementById("classement").innerHTML = httpRequest.responseText;
        }
    }
}
