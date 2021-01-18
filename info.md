# pull images of the version that you want
docker pull mongo:4.2.2

# create a container
docker run -it --name mongodb -d mongo:4.2.2

# chcekc logs
docker logs mongodb

# to get into the bash of the mongodb cotniner instance
docker exec -it mongodb bash

now here you can start the mongo shell


db.tasks.insert(
    {
        'taskId': 123,
        'sleepTime': 5,
        'state': 'created'
    }
)


docker pull ubuntu:16.04
docker run -it --name master -d node:12
docker exec -it master bash
