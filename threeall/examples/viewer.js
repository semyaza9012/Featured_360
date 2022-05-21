const asinChangerA = document.getElementById("bt1");
const asinChangerB = document.getElementById("bt2");
const measureDimentions = document.getElementById("bt3");
const openOrClose = document.getElementById("bt4");

const imageAnimOpenOrClose = openOrClose.getElementsByClassName("image")

//const imageAnimOpenOrClose = document.getElementById("bt4").getElementsByClassName("image")

asinChangerA.addEventListener("click", function() {
    btnA();
    console.log("working")
})

asinChangerB.addEventListener("click", function() {
    btnB();
    console.log("working")
})

measureDimentions.addEventListener("click", function() {
    console.log("working")
})

openOrClose.addEventListener("click", function() {
    /*
    if (imageAnimOpenOrClose.src == "./files/Animation+Button+Fold.png") {
        imageAnimOpenOrClose.src = "./files/Animation+Button+Unfold.png";
    }
    else {
        imageAnimOpenOrClose.src = "./files/Animation+Button+Fold.png";
    }
    */

    console.log(imageAnimOpenOrClose)
})
