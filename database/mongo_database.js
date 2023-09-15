import { MongoClient } from 'mongodb';

// Host, Port and Database for MongoClient
const host = 'localhost';
const port = 27017;
const database = 'taskmaster';

// The URL to connect to the database
const mongoUrl = `mongodb://${host}:${port}/${database}`;

class TaskClient {
    constructor() {
        this.client = new MongoClient(mongoUrl);
        this.client.connect().then(() => {
            this.db = this.client.db(database);
            console.log("Connected to MongoDB Server");
        }).catch((error) => {
            console.error(error);
        });
    }

    async connect() {
        await this.client.connect(); // Return if the MongoDB is connected
    }

    async tasksData() {
        const newTasks = [
            {
                id: 1,
                task: 'Pray After Waking Up'
            },
            {
                id: 2,
                task: 'Do few warmups and pushups for fitness'
            },
            {
                id: 3,
                task: 'Make Breakfast'
            },
            {
                id: 4,
                task: 'Get some morning sunlight'
            }
        ];
        await this.db.collection('tasks').insertMany(newTasks);
    }

    // Create Task definiton to create tasks
    async createTask(task) {
        const result = await this.db.collection('tasks').insertOne(task);
        return result;
    }

    // Retrieve Tasks from the database
    async retrieveTask(criteria) {
        const result = await this.db.collection('tasks').findOne(criteria);
        return result;
    }

    // Update a task in the database
    async updateTask(task, update) {
        const result = await this.db.collection('tasks').updateOne(task, { $set: update});
        return result;
    }

    // delete a task from the database
    async deleteTask(task) {
        const result = await this.db.collection('tasks').deleteOne(task);
        return result;
    }

    // Close the MongoClient connection
    async close() {
        await this.client.close();
    }
}

export default TaskClient;
