
var selectedButton = null;
var rankPageIndex;
const RANK_STEP = 100;

var playerPageIndex;
const PLAYER_STEP = 100;

var adminPageIndex;
const ADMIN_STEP = 100;

adminSetup();
function adminSetup(){
    putGamesButtons();
    playerPageIndex = 1;
    refreshPlayer();
    if(isSuperAdmin) {
        adminPageIndex = 1;
        refreshAdmin();
    }
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

function refresh(){
    refreshClassement();
    refreshPlayer();
    if(isSuperAdmin) {
        refreshAdmin();
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
    eraseNextClassement();
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "requestScore?game=" + selectedButton.id + "&pageIndex=" + 0 + "&step=" + rankPageIndex*RANK_STEP, true);
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
    httpRequest.open("POST", "requestScore?game=" + selectedButton.id + "&pageIndex=" + rankPageIndex + "&step=" + RANK_STEP, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            document.getElementById("classementData").innerHTML += httpRequest.responseText;
            rankPageIndex++;
        }
    }
}

function removeRank(playerName){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "removeScore?game=" + selectedButton.id + "&playerName=" + playerName, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            refreshClassement();
        }
    }
}

function removeUser(userName){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "removeUser?userName=" + userName, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            refresh();
        }
    }
}

function eraseNextPlayer(){
    var nodeAddNext = document.getElementById("addNextPlayer");
    if(nodeAddNext != null){
        nodeAddNext.remove();
    }
}

function refreshPlayer(){
    var node = document.getElementById("playerData");
    //console.log("resfresh " + node.children.length);
    //console.log(node.children[0]);
    for(var i = node.children.length-1; i >= 0; i--){
        //console.log(node.children[i])
        node.children[0].remove();
    }
    eraseNextPlayer();
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "requestPlayer?pageIndex=" + 0 + "&step=" + playerPageIndex*PLAYER_STEP, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            document.getElementById("playerData").innerHTML += httpRequest.responseText;
        }
    }
}

function nextPlayer(){
    eraseNextPlayer();
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "requestPlayer?pageIndex=" + playerPageIndex + "&step=" + PLAYER_STEP, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            document.getElementById("playerData").innerHTML += httpRequest.responseText;
            playerPageIndex++;
        }
    }
}

function eraseNextAdmin(){
    var nodeAddNext = document.getElementById("addNextAdmin");
    if(nodeAddNext != null){
        nodeAddNext.remove();
    }
}

function refreshAdmin(){
    var node = document.getElementById("adminData");
    //console.log("resfresh " + node.children.length);
    //console.log(node.children[0]);
    for(var i = node.children.length-1; i >= 0; i--){
        //console.log(node.children[i])
        node.children[0].remove();
    }
    eraseNextAdmin();
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "requestAdmin?pageIndex=" + 0 + "&step=" + adminPageIndex*ADMIN_STEP, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            document.getElementById("adminData").innerHTML += httpRequest.responseText;
        }
    }
}

function nextAdmin(){
    eraseNextAdmin();
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "requestAdmin?pageIndex=" + adminPageIndex + "&step=" + ADMIN_STEP, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            document.getElementById("adminData").innerHTML += httpRequest.responseText;
            adminPageIndex++;
        }
    }
}

function addAdmin(){
    //console.log("pass");
    var name = document.getElementById("addAdminName").value, mail = document.getElementById("addAdminMail").value, password = document.getElementById("addAdminPassword").value;
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "addAdmin?name=" + name + "&mail=" + mail + "&password=" + password, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            //console.log("inside");
            console.log(httpRequest.responseText);
            var res = JSON.parse(httpRequest.responseText);
            console.log(res);
            document.getElementById("resultAdminName").innerHTML = "";
            document.getElementById("errorAdminName").innerHTML = "";
            document.getElementById("errorAdminEmail").innerHTML = "";
            if(res.status){
                document.getElementById("addAdminName").value = "";
                document.getElementById("addAdminMail").value = "";
                document.getElementById("addAdminPassword").value = "";
                document.getElementById("resultAdminName").innerHTML = "opération réalisée avec succès";
            } else {
                if(res.errorName) {
                    document.getElementById("errorAdminName").innerHTML = "nom déjà pris, veuillez en choisir un autre ...";
                }
                if(res.errorMail){
                    document.getElementById("errorAdminEmail").innerHTML = "mail déjà pris, veuillez en choisir un autre ...";
                }
            }
            refresh();
        }
    }
}