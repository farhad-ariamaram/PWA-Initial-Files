//must prefrence "idb.min.js" and this("db.js") where use indexedDB

var db = (function(){

    var DB_NAME = 'my-db';
    var TABLE_NAME = 'table-name';
    
    //Context
    var dbPromise = idb.open(DB_NAME,1,function(db){
        if(!db.objectStoreNames.contains(TABLE_NAME))
        {
            db.createObjectStore(TABLE_NAME,{
                keyPath : 'id'
            });
        }
    });

    //GetById
    var getById = function (id){
        return dbPromise.then(function (db){
            return db
            .transaction(TABLE_NAME, 'readwrite')
            .objectStore(TABLE_NAME)
            .get(id);
        });
    }

    //Create
    var Create = function (data){
        return dbPromise.then(function (db){
            var tx =  db
            .transaction(TABLE_NAME, 'readwrite')
            .objectStore(TABLE_NAME)
            .put(data);
            return tx.complete;
        });
    }

    //ReadAll
    var getAll = function (){
        return dbPromise.then(function (db){
            return db
            .transaction(TABLE_NAME, 'readonly')
            .objectStore(TABLE_NAME)
            .getAll();
        });
    }

    //DeleteById
    var deleteById = function (id){
        return dbPromise.then(function (db){
            var tx = db
            .transaction(TABLE_NAME, 'readwrite')
            .objectStore(TABLE_NAME)
            .delete(id);
            return tx.complete;
        });
    }

    //DeleteAll
    var deleteAll = function (){
        return dbPromise.then(function (db){
            var tx =  db
            .transaction(TABLE_NAME, 'readonly')
            .objectStore(TABLE_NAME)
            .clear();
            return tx.complete;
        });
    }

return {
getById : getById,
Create : Create,
getAll : getAll,
deleteById : deleteById,
deleteAll: deleteAll
};
})();




///////////////////////////////////////////////////////////////////////
// Usage in app

//Create
db.Create(myData)
          .then(function () {
            alert('successfully updated to local db!');
          });


//GetAll
db.getAll()
      .then(function (data){
        var sortedByData = data.sort(function (a,b){
          return b.id - a.id;
        });
      });


//Delete
db.deleteById(1)
      .then(function (){
        alert('Note deleted');
      });
      

//GetById
db.getById(1)
      .then(function (data){
        titleInput.value = data.title;
        noteInput.value = data.note;
        AttachSubmitForm(data);
      });


//DeleteAll
db.deleteAll()
      .then(function (){
        alert('db clear!');
      });
