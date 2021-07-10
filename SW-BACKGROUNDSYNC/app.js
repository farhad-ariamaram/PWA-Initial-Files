//from sw.js  ===> var BACKGROUND_SYNC_SAVE = 'new-notes-sync'; 

if ('serviceWorker' in navigator && 'SyncManager' in window) {
  navigator.serviceWorker.ready
    .then(function (sw) {
      db.writeNote(noteData)
        .then(function () {
          helpers.showMessage('successfully updated to local db!');
          setTimeout(function () {
            window.location.href='/index.html';
          }, 500);

          //if background sync support
          //after submit new note in IndexedDB make a background sync
          return sw.sync.register(BACKGROUND_SYNC_SAVE);
    });
  });
} else {

  //if background sync does not support send data directly to server
  sendData(noteData)
  .then(function () {
    alert('successfully saved to server db!');
    setTimeout(function () {
      window.location.href='/index.html';
    }, 500);
  });
}