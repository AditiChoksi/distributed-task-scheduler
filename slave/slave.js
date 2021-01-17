const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const axios = require('axios')

app.post('/startTask', (req, res) => {
    console.log("Initiated start task at worker");

    let request_body = req.body;

    res.send('INITIATED');

    process_task(request_body['taskId'], request_body['sleepTime']);

    return;

})

function process_task(taskId, sleepTime) {
    console.log('Processing task on slave');

    console.log(taskId)
    console.log(sleepTime)

    setTimeout(function (taskId) {
        let payload = {
            'taskId': taskId,
            'status': 'completed'
        }
    
        axios.post('http://localhost:5000/completeTask', payload)
        .then(response => {
            console.log(response.data);
        })
    }, sleepTime)

    return;
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})