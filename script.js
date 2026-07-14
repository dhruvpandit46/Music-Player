// ======================================================
// MUSIC PLAYER
// ======================================================

// -------------------------
// DOM Elements
// -------------------------

const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");

const prevBtn = document.getElementById("prev");

const nextBtn = document.getElementById("next");

const title = document.getElementById("title");

const artist = document.getElementById("artist");

const cover = document.getElementById("cover");

const seekbar = document.getElementById("seekbar");

const currentTimeEl = document.getElementById("currentTime");

const durationEl = document.getElementById("duration");


// -------------------------
// Song Library
// -------------------------

const songs = [

{

title:"Conga Conga",

artist:"Gloria Estefan",

src:"assets/songs/Conga Conga.mp3",

cover:"assets/images/conga conga.jpeg"

},

{

title:"MONTAGEM VOIS",

artist:"Fatit",

src:"assets/songs/MONTAGEM VOIS.mp3",

cover:"assets/images/montagem vois.jpeg"

},

{

title:"Tacata",

artist:"Tacabro",

src:"assets/songs/Tacabro.mp3",

cover:"assets/images/tacata.jpeg"

},

{

title:"UR FINAL MESSAGE",

artist:"Slick Killa",

src:"assets/songs/UR FINAL MESSAGE.mp3",

cover:"assets/images/ur final message.jpg"

},

{

title:"Love Nwantiti",

artist:"CKay",

src:"assets/songs/love nwantiti (slowed) - (64 Kbps).mp3",

cover:"assets/images/love nawantiti.jpeg"

},

{

title:"On The Floor",

artist:"Jennifer Lopez",

src:"assets/songs/on the floor.mp3",

cover:"assets/images/on the floor.jpeg"

}

];


// -------------------------
// State
// -------------------------

let currentSong = 0;

let isPlaying = false;


// -------------------------
// Load Song
// -------------------------

function loadSong(index){

const song=songs[index];

title.textContent=song.title;

artist.textContent=song.artist || "Unknown Artist";

cover.src=song.cover;

audio.src=song.src;

}


// -------------------------
// Play Song
// -------------------------

async function playSong(){

try{

await audio.play();

isPlaying=true;

playBtn.innerHTML=

'<i class="fa-solid fa-pause"></i>';

cover.classList.add("playing");

}

catch(err){

console.error(err);

}

}


// -------------------------
// Pause Song
// -------------------------

function pauseSong(){

audio.pause();

isPlaying=false;

playBtn.innerHTML=

'<i class="fa-solid fa-play"></i>';

cover.classList.remove("playing");

}


// -------------------------
// Toggle
// -------------------------

function togglePlayer(){

if(isPlaying){

pauseSong();

}

else{

playSong();

}

}

playBtn.addEventListener(

"click",

togglePlayer

);


// -------------------------
// Next Song
// -------------------------

function nextSong(){

currentSong++;

if(currentSong>=songs.length){

currentSong=0;

}

loadSong(currentSong);

playSong();

}


// -------------------------
// Previous Song
// -------------------------

function previousSong(){

currentSong--;

if(currentSong<0){

currentSong=songs.length-1;

}

loadSong(currentSong);

playSong();

}

nextBtn.addEventListener(

"click",

nextSong

);

prevBtn.addEventListener(

"click",

previousSong

);


// -------------------------
// Fade Animation
// -------------------------

function animateSongChange(){

cover.style.opacity="0";

title.style.opacity="0";

artist.style.opacity="0";

setTimeout(()=>{

cover.style.opacity="1";

title.style.opacity="1";

artist.style.opacity="1";

},250);

}

const originalLoadSong=loadSong;

loadSong=function(index){

animateSongChange();

originalLoadSong(index);

};


// -------------------------
// Initial Song
// -------------------------

loadSong(currentSong);




// ======================================================
// PROGRESS BAR
// ======================================================

audio.addEventListener("loadedmetadata", () => {

    durationEl.textContent = formatTime(audio.duration);

});

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    const progress = (audio.currentTime / audio.duration) * 100;

    seekbar.value = progress;

    currentTimeEl.textContent = formatTime(audio.currentTime);

    durationEl.textContent = formatTime(audio.duration);

});

seekbar.addEventListener("input", () => {

    if (!audio.duration) return;

    audio.currentTime =

        (seekbar.value / 100) * audio.duration;

});

// ======================================================
// FORMAT TIME
// ======================================================

function formatTime(seconds) {

    if (isNaN(seconds)) return "0:00";

    const min = Math.floor(seconds / 60);

    const sec = Math.floor(seconds % 60);

    return `${min}:${sec.toString().padStart(2, "0")}`;

}

// ======================================================
// SONG END
// ======================================================

audio.addEventListener("ended", () => {

    nextSong();

});

// ======================================================
// KEYBOARD SHORTCUTS
// ======================================================

document.addEventListener("keydown", (event) => {

    // Ignore when typing
    if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
    ) {
        return;
    }

    switch (event.code) {

        case "Space":

            event.preventDefault();

            togglePlayer();

            break;

        case "ArrowRight":

            nextSong();

            break;

        case "ArrowLeft":

            previousSong();

            break;

    }

});

// ======================================================
// MEDIA SESSION
// ======================================================

function updateMediaSession() {

    if (!("mediaSession" in navigator)) return;

    const song = songs[currentSong];

    navigator.mediaSession.metadata = new MediaMetadata({

        title: song.title,

        artist: song.artist,

        album: "Music Player",

        artwork: [

            {

                src: song.cover,

                sizes: "512x512",

                type: "image/png"

            }

        ]

    });

}

audio.addEventListener("play", updateMediaSession);

// Media Buttons

if ("mediaSession" in navigator) {

    navigator.mediaSession.setActionHandler(

        "play",

        playSong

    );

    navigator.mediaSession.setActionHandler(

        "pause",

        pauseSong

    );

    navigator.mediaSession.setActionHandler(

        "nexttrack",

        nextSong

    );

    navigator.mediaSession.setActionHandler(

        "previoustrack",

        previousSong

    );

}

// ======================================================
// IMAGE LOADING
// ======================================================

cover.addEventListener("load", () => {

    cover.style.opacity = "1";

});

cover.addEventListener("error", () => {

    console.warn("Cover image not found.");

});

// ======================================================
// AUDIO ERROR
// ======================================================

audio.addEventListener("error", () => {

    console.error("Unable to load song.");

});

// ======================================================
// WINDOW EVENTS
// ======================================================

window.addEventListener("focus", () => {

    console.log("Window Active");

});

window.addEventListener("blur", () => {

    console.log("Window Inactive");

});

// ======================================================
// SERVICE WORKER
// ======================================================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", async () => {

        try {

            const registration =

                await navigator.serviceWorker.register("./sw.js");

            console.log("✅ Service Worker Registered");

            console.log(registration);

        }

        catch (error) {

            console.error("❌ Service Worker Error");

            console.error(error);

        }

    });

}

// ======================================================
// READY
// ======================================================

console.log("🎵 Music Player Ready");
