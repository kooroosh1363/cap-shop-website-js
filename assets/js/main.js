var img = document.querySelector("#main-cap");
var black = document.querySelector(".black");
var red = document.querySelector(".red");
var green = document.querySelector(".green");
var sand = document.querySelector(".sand");
var grayWhite = document.querySelector(".gray-white");
var white = document.querySelector(".white");

const color = document.querySelectorAll(".color");


// shop product info
var info = [
    {
        src:"../img/black.png"
    },
    {
        src: "../img/green.png"
    },
    {
        src:"../img/red.png"
    },
    {
        src:"../img/sand.png"
    },
    {
        src:"../img/greyWhite.png"
    },
    {
        src:"../img/white.png"
    }
]


// change-color

black.addEventListener("click",function(){
    img.src = info[0].src;
})
green.addEventListener("click",function(){
    img.src = info[1].src;
})
red.addEventListener("click",function(){
    img.src = info[2].src;
})
sand.addEventListener("click",function(){
    img.src = info[3].src;
})
grayWhite.addEventListener("click",function(){
    img.src = info[4].src;
})
white.addEventListener("click",function(){
    img.src = info[5].src;
})