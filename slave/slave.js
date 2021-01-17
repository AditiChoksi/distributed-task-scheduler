const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const axios = require('axios')

function process_task(taskId, sleepTime) {
    console.log('Processing task on slave');

    setTimeout(async function() {
        let payload = {
            'taskId': taskId,
            'status': 'completed'
        }
    
        let response  = await axios.post('http://localhost:5000/completeTask', payload);
        console.log(response.data);

    }, sleepTime*1000)

    return;
}

app.post('/startTask', (req, res) => {
    console.log("Initiated start task at worker");

    let request_body = req.body;

    res.send('INITIATED');

    process_task(request_body['taskId'], request_body['sleepTime']);

    return;

})

app.get('/check_health', (req, res) => {
    res.send('Slave is Alive');
})

app.listen(port, () => {
  console.log(`Slave listening at http://localhost:${port}`)
})