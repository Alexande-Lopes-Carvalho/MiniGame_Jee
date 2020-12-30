
var selectedButton = null;
var rankPageIndex;
const RANK_STEP = 5;


rankSetup();
function rankSetup(){
    putGamesButtons();
    playerPageIndex = 1;
}

function putGamesButtons(){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "gamesButtons", true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            document.getElementById("classementButtons").innerHTML = httpRequest.responseText;
            selectFirstGameButton();
        }
    }
}

function selectFirstGameButton(){
    selectGame(document.getElementById("classementButtons").children[0].children[0]);
}

function selectGame(node){
    //console.log(node)
    if(selectedButton != null){
        selectedButton.disabled = false;
    }
    selectedButton = node;
    selectedButton.disabled = true;
    rankPageIndex = 1;
    refreshClassement();
}

function eraseNextClassement(){
    var nodeAddNext = document.getElementById("addNextClassement");
    if(nodeAddNext != null){
        nodeAddNext.remove();
    }
}

function refreshClassement(){
    var node = document.getElementById("classementData");
    //console.log("resfresh " + node.children.length);
    //console.log(node.children[0]);
    for(var i = node.children.length-1; i >= 0; i--){
        //console.log(node.children[i])
        node.children[0].remove();
    }
    //console.log(selectedButton.id);
    eraseNextClassement();
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "classementJeux?game=" + selectedButton.id + "&pageIndex=" + 0 + "&step=" + rankPageIndex*RANK_STEP, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            document.getElementById("classementData").innerHTML += httpRequest.responseText;
        }
    }
}

function nextClassement(){
    eraseNextClassement();
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "classementJeux?game=" + selectedButton.id + "&pageIndex=" + rankPageIndex + "&step=" + RANK_STEP, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            document.getElementById("classementData").innerHTML += httpRequest.responseText;
            rankPageIndex++;
        }
    }
}
