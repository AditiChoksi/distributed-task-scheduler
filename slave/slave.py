import time, json, requests, asyncio

from flask import Flask, request
app = Flask(__name__)


@app.route('/startTask',  methods=['POST'])
def start_task():

    request_body = json.loads(request.json)
    processTask(request_body['taskId'], request_body['sleepTime'])
    
    #processTask(123, 3)
    
    return "True"

async def processTask(taskId, sleepTime):
    #sleepTime is in seconds
    print('hi')
    await asyncio.sleep(sleepTime)

    payload = {
        'taskId': taskId,
        'status': 'completed'
    }

    r = requests.post('http://localhost:5000/completeTask', data=json.dumps(payload))
    print(r.json)




if __name__ == "__main__":
    app.run(debug=True, port=3000)