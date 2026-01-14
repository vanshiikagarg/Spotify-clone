const playBtn = document.getElementById("play");
const player = document.getElementById("player");
const songBtns = document.querySelectorAll(".songBtn");
const preBtn=document.getElementById("previous");
const nextBtn=document.getElementById("next");
let currentIndex = -1;
let currentBtn = null; 
const progressBar = document.getElementById("music-range");

player.addEventListener("loadedmetadata", () => {
  progressBar.value = 0;
});
player.addEventListener("timeupdate", () => {
  if (!player.duration) return;

  const progress =
    (player.currentTime / player.duration) * 100;

  progressBar.value = progress;
});
progressBar.addEventListener("input", () => {
  if (!player.duration) return;

  const seekTime =
    (progressBar.value / 100) * player.duration;

  player.currentTime = seekTime;
});

player.addEventListener("ended", () => {
  progressBar.value = 0;
});


songBtns.forEach((btn,index)=>{
    btn.addEventListener("click",()=>{
        currentIndex=index;
        playSong(index);
    })
});

function playSong(index){
    const btn=songBtns[index];
    player.src=btn.dataset.src;
    player.play();
    if (currentBtn) currentBtn.src = "/Images/Icons/play.png";
  btn.src = "/Images/Icons/pause.png";
  currentBtn = btn;
}

playBtn.addEventListener("click", () => {
      if (currentIndex === -1) return;
    if (!player.src) return;
    if (player.paused) {
        player.play();
    } else {
        player.pause();
    }
});

player.addEventListener("play", () => {
    playBtn.src = "./Images/Icons/pause-button.png";
    if (currentBtn) currentBtn.src = "/Images/Icons/pause.png";
});

player.addEventListener("pause", () => {
    playBtn.src = "./Images/Icons/play-button.png";
    if (currentBtn) currentBtn.src = "/Images/Icons/play.png";
});

preBtn.addEventListener("click",()=>{
    if(currentIndex<=0) return;
    currentIndex--;
    playSong(currentIndex);
});

nextBtn.addEventListener("click",()=>{
    if(currentIndex>=songBtns.length-1) return;
    currentIndex++;
    playSong(currentIndex);
});