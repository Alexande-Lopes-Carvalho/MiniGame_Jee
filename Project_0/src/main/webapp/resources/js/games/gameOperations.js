

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

function refreshPageRanks(game){ // rafraichit le classement sur la page utilisateur (A REMPLIR)
    // ...
    console.log("refreshPageRanks");
}