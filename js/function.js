function enterfullscreen() {
    var docElm = document.documentElement;
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
    document.getElementById("fullscreen").src = "../img/fullscreen-exit.png";
}

function exitfullscreen() { //退出全屏
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    document.getElementById("fullscreen").src = "../img/fullscreen.png";
}

function fullscreen() {
    // body...
    var imgSource = document.getElementById("fullscreen").src;
    if (imgSource.split("/")[imgSource.split("/").length-1] == 'fullscreen.png') {
        enterfullscreen();
    } else {
        exitfullscreen();
    }
}

$(document).ready(function() {
    // body...
    $('[data-toggle="fullscreentips"]').tooltip();
});

function getRatingByDate(res,dates) {
    for (var i=0;i<res.length;i++){
        if (res[i].times==dates) {
            return res[i].rating
        }
    }
    return 0
}
function isInArray(arr,value){
    for(var i = 0; i < arr.length; i++){
        if(value === arr[i]){
            return true;
        }
    }
    return false;
}

function getInfoByTime(items, time) {
    for(var i=0;i<items.length;i++){
        if(items[i].times == time)
            return items[i]
    }
    return null
}

