// resize navbar
var navbar = document.querySelector(".navbar");
// for the scroll is higher than 20 viewport height, add sticky class to the navbar
window.onscroll = () => {
    this.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
}

// navabr toggle
const menuNav = document.querySelector(".menu");
toggleNav = document.querySelector(".btn-menu");
if(toggleNav){
    toggleNav.addEventListener("click", () =>{
        menuNav.classList.toggle("active");
    })
}

// when clicked btn-menu closed
const linkNav = document.querySelectorAll(".link-nav");
function actionLink(){
    const menuNav = document.querySelector(".menu");
    menuNav.classList.remove("active")
}
linkNav.forEach(n => n.addEventListener("click", actionLink));

var img = document.querySelector("#main-cap");
var black = document.querySelector(".black");
var red = document.querySelector(".red");
var green = document.querySelector(".green");
var sand = document.querySelector(".sand");
var grayWhite = document.querySelector(".gray-white");
var white = document.querySelector(".white");

const color = document.querySelectorAll(".colors");


// shop product info
var info = [
    {
        src:"/assets/img/black.png"
    },
    {
        src: "/assets/img/green.png"
    },
    {
        src:"/assets/img/red.png"
    },
    {
        src:"/assets/img/sand.png"
    },
    {
        src:"/assets/img/greyWhite.png"
    },
    {
        src:"/assets/img/white.png"
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


// active color
function colors(){
    colors.forEach(c => c.classList.remove('active'));
    this.classList.add('active');
}

colors.forEach(c => c.addEventListener('click',color));



