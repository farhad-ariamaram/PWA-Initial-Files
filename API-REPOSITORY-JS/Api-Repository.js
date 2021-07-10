var SERVER_URL = 'http://192.168.1.142:2871/api/notes/';

function getAllNotes()
{
    return fetch(SERVER_URL);
}

function getById(id)
{
    return fetch(SERVER_URL+id);
}

function sendData(noteData) {
    return fetch(SERVER_URL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(noteData)
    });
}

function updateData(noteData) {
    return fetch(SERVER_URL+noteData.id,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(noteData)
    });
}

function deleteData(id) {
    return fetch(SERVER_URL+id,{
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    });
}