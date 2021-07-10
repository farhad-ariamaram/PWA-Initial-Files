self.addEventListener('install',function(event){
  console.log('Service Worker Installing ...',event);
});

self.addEventListener('activate',function(event){
  console.log('Service Worker Activating ....',event);
});
