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


function contains(arrays, obj) {
    var i = arrays.length;
    while (i--) {
        if (arrays[i] === obj) {
            return i;
        }
    }
    return false;
}


function getInfoByPosition(lat, lon, res) {
    var dis = []
    var distances = []
    for (var i = 0; i < res.length; i++) {
        var distance = (res[i].lat-lat)*(res[i].lat-lat)+(res[i].lng-lon)*(res[i].lng-lon)
        dis.push(distance)
        distances.push(distance)
    }
    var min = dis.sort(function (a, b) {
      return a-b;
    })[0];
    return res[distances.indexOf(min)]
}

function getCenterText(coordinates, x) {
    var counter = 0
    var sum = 0
    for (var i = 0; i < coordinates.length; i++) {
        for (var j = 0; j < coordinates[i].length; j++) {
            for (var k = 0; k < coordinates[i][j].length; k++) {
                sum += coordinates[i][j][k][x]
                counter++
            }
        }
    }
    return sum/counter
}

function color(i) {
    // body...
    return colorbrewer.Set3[12][i];
}

function getDataByType(res, type) {
    datas = []
    for(var i=0;i<res.length;i++){
        if(res[i].item_type == type){
            datas.push(res[i])
        }

    }
    return datas
}

function unique(array) {
    var res = [];
    for (var i = 0, len = array.length; i < len; i++) {
        var current = array[i];
        if (res.indexOf(current) === -1) {
            res.push(current)
        }
    }
    return res;
}

function getTypes(res) {
    var types = []
    for (var i = 0; i < res.length; i++) {
        types.push(res[i].item_type)
    }
    return unique(types)
}

function getYear(res) {
    var years = []
    for (var i = 0; i < res.length; i++) {

        years.push(res[i].times.slice(0, 4))
    }
    return unique(years)
}