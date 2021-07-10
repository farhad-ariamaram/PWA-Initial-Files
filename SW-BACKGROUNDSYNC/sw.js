//other sw events ...
var BACKGROUND_SYNC_SAVE = 'new-notes-sync';

//when "sw.sync.register(BACKGROUND_SYNC_SAVE);" called in app.js this event run
self.addEventListener('sync', function (event) {
    console.log('[SW] Background Syncing',event);

    if(event.tag === BACKGROUND_SYNC_SAVE)
    {
       event.waitUntil(
           //read all notes from IndexedDB that synced==false
           db.readAllNote()
           .then(function (data) {
              data
              .filter(note => !note.synced)
              .map(note => {
                  //send all unsynced data to server
                  sendData(note);
              }) ;
           })
       ); 
    }

});