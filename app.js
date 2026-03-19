let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "green", "red", "purple"];

let started = false;
let level = 0;

let highScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keydown", function () {
    if (started == false) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
};

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
};

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level} | High Score: ${highScore}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randClr = btns[randIdx];
    let randBtn = document.querySelector(`.${randClr}`);
    gameSeq.push(randClr);

    btnFlash(randBtn);
}

function chkAns(idx) {

    if (gameSeq[idx] == userSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if (level > highScore) {
            highScore = level;
        }

        h2.innerHTML = `Game over! Your score was <b>${level}</b> 
    <br> High Score: <b>${highScore}</b> 
    <br> Press any key to Start`;

        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "#111";
        }, 250);
        reset();
    }
}

function btnPress() {
    // console.log(this);
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    chkAns(userSeq.length - 1);
};

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
};