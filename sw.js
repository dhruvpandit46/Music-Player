const CACHE_NAME = "music-player-v2";

const FILES_TO_CACHE = [

    "./",

    "./index.html",

    "./style.css",

    "./script.js",

    "./assets/images/conga conga.jpeg",

    "./assets/images/montagem vois.jpeg",

    "./assets/images/tacata.jpeg",

    "./assets/images/ur final message.jpg",

    "./assets/images/love nawantiti.jpeg",

    "./assets/images/on the floor.jpeg",

    "./assets/songs/Conga Conga.mp3",

    "./assets/songs/MONTAGEM VOIS.mp3",

    "./assets/songs/Tacata.mp3",

    "./assets/songs/UR FINAL MESSAGE.mp3",

    "./assets/songs/love nwantiti (slowed) - (64 Kbps).mp3",

    "./assets/songs/on the floor.mp3"

];

// INSTALL

self.addEventListener("install", (event) => {

    console.log("Installing...");

    event.waitUntil(

        (async () => {

            const cache = await caches.open(CACHE_NAME);

            for (const file of FILES_TO_CACHE) {

                try {

                    await cache.add(file);

                    console.log("✅ Cached", file);

                }

                catch(error){

                    console.error("❌ Failed", file);

                    console.error(error);

                }

            }

        })()

    );

});

// ACTIVATE

self.addEventListener("activate", (event) => {

    console.log("Activated");

});

// FETCH

self.addEventListener("fetch", (event) => {

    event.respondWith(

        caches.match(event.request)

        .then((response)=>{

            if(response){

                console.log("📦 Cache:",event.request.url);

                return response;

            }

            console.log("🌍 Network:",event.request.url);

            return fetch(event.request);

        })

    );

});
