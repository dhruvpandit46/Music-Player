const CACHE_NAME = "music-player-v2";

const FILES_TO_CACHE = [

    "./",

    "./index.html",

    "./style.css",

    "./script.js",

    "./assets/images/sapphire.png",

    "./assets/images/big dawgs.jpg",

    "./assets/images/slavafunk.jpg",

    "./assets/images/matushka.jpg",

    "./assets/images/funk de beleza.jpg",

    "./assets/images/passo bem solto.jpg",

    "./assets/songs/Sapphire.mp3",

    "./assets/songs/Hanumankind Big Dawgs.mp3",

    "./assets/songs/SLAVA FUNK!.mp3",

    "./assets/songs/Matushka Ultrafunk.mp3",

    "./assets/songs/FUNK DE BELEZA.mp3",

    "./assets/songs/PASSO BEM SOLTO.mp3"

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
