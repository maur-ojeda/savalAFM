//pegar en el build al mismo nivel que el ngsw-worker.js
importScripts('./ngsw-worker.js')

self.addEventListener('sync', (event) => {


    if (event.tag === 'post-data') {
        //call method
        event.waitUntil(addData())
    }

});

function addData() {
    //to index db
    let obj = {
        name: 'subRat'
    }
    fetch('https://devactivofijo.saval.cl/webservice/rest/asset/move/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Basic bW9iaWxlX3VzZXI6dGVzdGluZw=="
        },
        body: JSON.stringify(obj)
    }).then(() => Promise.resolve()).catch(() => Promise.reject())

}