
operationsSetup();
function operationsSetup(){
    putHeader();
    putFooter();
    //console.log("pass");
}

function putHeader(){
    putPage("header");
}

function putFooter(){
    putPage("footer");
}

function putPage(name){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", name, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            //console.log("received :" + httpRequest.responseText);
            document.getElementById(name).innerHTML = httpRequest.responseText;
        }
    }
}