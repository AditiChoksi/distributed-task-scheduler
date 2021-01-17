const express = require('express');
const app = express();
const port = 5000;

const axios = require('axios');

let MOCK_DATA = {
    'taskId': 123,
    'sleepTime': 3,
    'state': 'created'
};

let SLAVES_STATUS = {
    0: [9,8,7],
    1: []
};

function get_task_from_db() {
    return MOCK_DATA;
}

function update_task_in_db(taskId) {
    MOCK_DATA['state'] = 'running'
}

app.get('/assignWorker', (req, res) => {
    console.log("Assign worker initiated");

    // get available slave
    let available_slave = SLAVES_STATUS[0].shift();

    // get tasks from DB
    let data = get_task_from_db();

    // prepare payload
    let payload = {
        'taskId': data['taskId'],
        'sleepTime': data['sleepTime']
    };
    
    // send task to available slave
    axios.post('http://localhost:3000/startTask', payload)
    .then(response => {
        if(response.data == "INITIATED") {
            SLAVES_STATUS[1].push(available_slave);

            update_task_in_db(data['taskId'])

            console.log(SLAVES_STATUS)
            console.log(MOCK_DATA)
        }
        res.send(response.data)
    })

    return;
})

app.post('/completeTask', (req, res) => {
    console.log("Complete task initiated")

    for(let i = 0; i < 10; i++){
        console.log('This loop stil works');
    }

    res.send('ACK')

    return "complte complete"
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})