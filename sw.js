/**
 * Service Worker
 * @author SamuelGadelha
 */

//Instalação do Service Worker
self.addEventListener('install', (event)=> {
    console.log("Instalando o ServiceWorker...", event)
    //Pré carregamento em cache
    event.waitUntill(
        caches.open('static')
        .then((cache)=> {
            console.log("Pré carregamento dos arquivos do app")
            cache.add('/etagas')
            cache.add('/etagas/index.html')
            cache.add('/etagas/style.css')
            cache.add('/etagas/app.js')
            cache.add('/etagas/img/flex.png')
            cache.add('/etagas/img/calcflex.png')
            cache.add('/etagas/img/etanol.png')
            cache.add('/etagas/img/gasolina.png')
        })
    )
})

//Ativação do Service Worker
self.addEventListener('activate', (event)=> {
    console.log("ativando o ServiceWorker...", event)
    return self.clients.claim() // garantir o seriço em todos os documentos do app
})

//Escutado requisições "buscando algo"
self.addEventListener('fetch', (event)=> {
   // console.log("Buscando algo...", event)
   //armazenar em cache(arquivos de todas as requisições)~
   event.respondWith(
    caches.match(event.request)
    .then((response)=> {
        if (response) {
            return response
        } else{
            return fetch(event.request)
        }
    })
   )
})