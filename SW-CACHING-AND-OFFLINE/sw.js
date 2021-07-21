const STATIC_CACHE_VERSION = 'static_2'
const DYNAMIC_CACHE_VERSION = 'dynamic_2'


const STATIC_ASSESTS = [
    '/',
    '/index.html',
    '/help.html',
    '/offline.html',
    '/css/skeleton.css',
    '/css/style.css',
    '/js/main.js',
    '/images/placeholder.png'
];


/*self.addEventListener('install', (event) => {
    console.log('[SW] installing Service Worker ...');
    event.waitUntil(

        //cache static files
        caches.open(STATIC_CACHE_VERSION)
            .then((cache) => {
                console.log('cache ready');
                return cache.addAll(STATIC_ASSESTS);
            })
            .catch(e => {
                console.log('cache error');
            })
    );
});*/

self.addEventListener('install', (event) => {
    console.log('[SW] installing Service Worker ...');
    event.waitUntil(
        caches.open(STATIC_CACHE_VERSION).then(function (cache) {
            return cache.addAll(STATIC_ASSESTS);
        })
    )
});



self.addEventListener('activate', (event) => {
    console.log('[SW] activating Service Worker ...');

    //remove old caches from browser
    event.waitUntil(
        caches.keys()
            .then((keys) => {
                return Promise.all(keys.map((key) => {
                    if (key !== STATIC_CACHE_VERSION && key != DYNAMIC_CACHE_VERSION) {
                        console.log('[SW] Remove Old Cache ', key);
                        return caches.delete(key);
                    }
                }));
        }));
    return self.clients.claim();
});



self.addEventListener('fetch', (event) => {
    console.log('[SW] fetching ...');
    const request = event.request;

    event.respondWith(

        //search in cache
        caches.match(request)
            .then((response) => {
                return response || fetch(request)

                    //not in cache but has internet
                    .then((res) => {

                        //cache it in dynamic cache
                        caches.open(DYNAMIC_CACHE_VERSION)
                            .then((cache) => {
                                cache.put(request, res);
                            });
                        return res.clone();
                    })
                    .catch((err) => {

                        //not in cache and no internet connection
                        console.log('[SW] cache fetch error');
                        return caches.open(STATIC_CACHE_VERSION)
                            .then(function (cache) {

                                //if wants go to a page that not cached, bring him to offline.html
                                if (request.headers.get('accept').includes('text/html')) {
                                    return cache.match('/offline.html');
                                    //note: '/offline.html' should cache in statics => const STATIC_ASSESTS
                                }

                                //if request a pic that not cached display default pic (placeholder.png)
                                if(request.url.match(/\.(jpe?g|png|gif|svg)$/))
                                {
                                    return cache.match('/images/placeholder.png');
                                    //note: '/images/placeholder.png' should cache in statics => const STATIC_ASSESTS
                                }

                            });
                    });
            })
            .catch(console.error)
    );

});
