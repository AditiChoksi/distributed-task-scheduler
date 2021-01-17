const express = require('express');
const app = express();

const axios = require('axios');

const {MongoClient} = require('mongodb');

const uri = "mongodb://172.17.0.2:27017/scheduler";
const port = 5000;
var client;

MongoClient.connect(uri, {useUnifiedTopology: true }, function(err, database) {
    if(err) throw err;
    client = database;

    app.listen(port, () => {
        console.log(`Master listening at http://localhost:${port}`)
    })
});

let MOCK_DATA = {
    'taskId': 123,
    'sleepTime': 3,
    'state': 'created'
};

let SLAVES_STATUS = {
    0: [9,8,7],
    1: []
};

async function get_task_from_db() {

    var query = { state: "created" };

    //databasesList = await client.db().admin().listDatabases();
    //databasesList.databases.forEach(db => console.log(` - ${db.name}`));

    let result = await client.db().collection("tasks").findOne(query)
    return result

}

async function update_task_in_db(taskId) {
    
    var query = { taskId: taskId };
    var newvalues = { $set: { state: "created" } };

    await client.db().collection("tasks").updateOne(query, newvalues)
}

async function assignWorker() {
    // get available slave
    let available_slave = SLAVES_STATUS[0].shift();

    let data = await get_task_from_db();

    if(data != null) {

        // prepare payload
        let payload = {
            'taskId': data['taskId'],
            'sleepTime': data['sleepTime']
        };

        // send task to available slave
        let response = await axios.post('http://localhost:3000/startTask', payload);

        if(response.data != null) {
            SLAVES_STATUS[1].push(available_slave);

            await update_task_in_db(data['taskId'])

        }

        return response;

    }

    return {'data': "NO PENDING TASKS"}
}

app.get('/assignWorker', (req, res) => {

    console.log("Assign worker initiated");
    assignWorker().then((response) => {res.send(response.data);})
    return;

})

app.post('/completeTask', (req, res) => {

    console.log("Complete task initiated")
    res.send('ACK')
    return;
})

app.get('/check_health', (req, res) => {
    res.send('Master is Alive');
})