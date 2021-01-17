import json, requests

from flask import Flask, request
app = Flask(__name__)

MOCK_DATA = {
    'taskId': 123,
    'sleepTime': 3
}

SLAVES_STATUS = {
    0: [9,8,7],
    1: []
}
    
def get_tasks_from_db():
    return MOCK_DATA

@app.route('/assignWorker')
def assignWorker():
    print("#####request received")
    while len(SLAVES_STATUS[0]) > 0:

        # get available slave
        available_slave = SLAVES_STATUS[0].pop(0)

        # get tasks from DB
        data = get_tasks_from_db()

        # prepare payload
        payload = {
            'taskId': data['taskId'],
            'sleepTime': data['sleepTime']
        }

        # send task to available slave
        r = requests.post('http://localhost:3000/startTask', json=json.dumps(payload))
        
        # if r is True update the slave status
        SLAVES_STATUS[1].append(available_slave)

        #if r is false mark the slave as available

        return "processed"


@app.route('/completeTask', methods=['POST'])
def complete_task():
    print('in complete')
    return {'a':"Task complete"}

if __name__ == "__main__":
    app.run(debug=True, port=5000)