let gameseq = [];
let userseq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game is started");
    started = true;
    levelUp();
  }
});

// buttom flash karne ke liya phele to classlist ke andar flash wali class
// ko add kardo
// flash class jaise hi add  ho gyi mtlb background color white ho jayga
// phir dubara se uska original background color lekar aana ha to 1sec ke
// baad hmm us class ko hta dege

function playSound(soundId) {
  const audio = document.getElementById(soundId);
  audio.play();
}

function gameflash(btn) {
  btn.classList.add("flash");
  playSound("gameSound");

  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userflash(btn) {
  btn.classList.add("userflash");
  playSound("userSound");

  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userseq = [];
  level++;
  h2.innerText = `Leve ${level}`;

  //random btn choose
  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  //   console.log(randIdx);
  //   console.log(randColor);
  //   console.log(randBtn);

  gameseq.push(randColor);
  console.log(gameseq);
  gameflash(randBtn);
}

function checkAns(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length == gameseq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b> ${level}</b>. <br>Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    playSound("WrongSound");
    reset();
  }
}

function btnPress() {
  //detect karna ha konsa button press kiya ha this use
  //kiya ha us button ke liya
  let btn = this;
  userflash(btn);

  //button jise press kiya gya tha  us button ki id le liya getarrribute
  //method se
  usercolor = btn.getAttribute("id");
  userseq.push(usercolor);

  checkAns(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
}
