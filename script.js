// Select elements
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

// Song data
const songs = [
  {
    title: "Sapphire",
    artist: "ED sheeran & Arjit Sigh",
    src: "assets/songs/Sapphire.mp3",
    cover: "assets/images/sapphire.png"
  },
  {
    title: "Hanumankind Big Dawgs",
    artist: "Hanumankind",
    src: "assets/songs/Hanumankind Big Dawgs.mp3",
    cover: "assets/images/big dawgs.jpg"
  },
{
    title: "Slava Funk!",
    artist: "",
    src: "assets/songs/SLAVA FUNK!.mp3",
    cover: "assets/images/slavafunk.jpg"
  },
  {
    title: "Matushka Ultrafunk",
    artist: "",
    src: "assets/songs/Matushka Ultrafunk.mp3",
    cover: "assets/images/matushka.jpg"
  },
    {
    title: "Funk De Beleza",
    artist: "",
    src: "assets/songs/FUNK DE BELEZA.mp3",
    cover: "assets/images/funk de beleza.jpg"
  },
  {
    title: "PASSO BEM SOLTO",
    artist: "",
    src: "assets/songs/PASSO BEM SOLTO.mp3",
    cover: "assets/images/passo bem solto.jpg"
  }
];

let songIndex = 0;
let isPlaying = false;

// Load song
function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
}

// Play song
function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = "⏸️";
}

// Pause song
function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.innerHTML = "▶️";
}

// Toggle play/pause
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Next song
nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
});

// Prev song
prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
});

// Update seekbar & time
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  seekbar.value = (audio.currentTime / audio.duration) * 100;

  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

// Change seek position
seekbar.addEventListener("input", () => {
  audio.currentTime = (seekbar.value / 100) * audio.duration;
});

// Format time helper
function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Auto next when song ends
audio.addEventListener("ended", () => {
  nextBtn.click();
});

// Initial load
loadSong(songIndex);
