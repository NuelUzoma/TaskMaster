import client from './db_connection.js';

class TaskSchema {
    constructor() {
        client.connect().then(() => {
            this.db = client.db('taskmaster');
            this.collection = this.db.collection('tasks');
            console.log("Connected to MongoDB Server");
        }).catch((error) => {
            console.error(error);
        });
    }

    async connect() {
        await client.connect(); // Return if the MongoDB is connected
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
        await this.collection.insertMany(newTasks);
    }

    // Create Task definiton to create tasks
    async createTask(task) {
        const result = await this.collection.insertOne(task);
        return result;
    }

    // Retrieve Tasks from the database
    async retrieveTask(criteria) {
        const result = await this.collection.findOne(criteria);
        return result;
    }

    // Update a task in the database
    async updateTask(task, update) {
        const result = await this.collection.updateOne(task, { $set: update});
        return result;
    }

    // delete a task from the database
    async deleteTask(task) {
        const result = await this.collection.deleteOne(task);
        return result;
    }

    // Close the MongoClient connection
    async close() {
        await client.close();
    }
}

export default TaskSchema;
