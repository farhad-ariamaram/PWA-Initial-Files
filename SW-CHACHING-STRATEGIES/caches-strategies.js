//1 Cache only
event.respondWith(
    caches.match(request)
);



//2 Network Only
event.respondWith(
    fetch(event.request)
);          



//3 cache first , falling back to network
event.respondWith(
    caches.match(request)
        .then((res) => {
             return res || fetch(request)
                 .then((newRes) => {
                     caches.open(DYNAMIC_CACHE_VERSION)
                         .then(cache => cache.put(request,newRes));
                            return newRes.clone();
         });
    })
);



//4 Network first , falling back to cache
event.respondWith(
    fetch(request)
        .then((res) => {
            caches.open(DYNAMIC_CACHE_VERSION)
                .then(cache => cache.put(request,res));
                    return res.clone();
        })
    .catch(err => caches.match(request))
);




// 5 Cache with newtork update
event.respondWith(
    caches
    .match(request)
    .then((res) => {
        
        const UpdateResponse = fetch(request)
        .then((newRes) => {
            cache.put(request,newRes.clone());
            return newRes;
        });

        return res || UpdateResponse;
    })
);




// 6 Cache & Network Race
let firstRejectionRecived = false;
const rejectOnce = () => {
    if(firstRejectionRecived){
        reject('No Response Recived')
    }else{
        firstRejectionRecived =true;
    }

};
const promiseRace = new Promise((resolve,reject) => {
        fetch(request)
        .then(res => res.ok ? resolve(res) : rejectOnce())
        .catch(rejectOnce);
});
event.respondWith(promiseRace);

