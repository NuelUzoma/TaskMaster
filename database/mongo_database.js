import { MongoClient } from 'mongodb';

const host = 'localhost';
const port = 27017;
const database = 'taskmaster';

const mongoUrl = `http://${host}:${port}/${database}`;

class taskClient {
    constructor() {
        this.client = new MongoClient(mongoUrl);
        this.client.connect().then(() => {
            this.db = this.client.db(database);
            console.log("Connected to MongoDB Server");
        }).catch((error) => {
            console.error(error);
        });
    }

    ifConnected() {
        return this.db.isConnected;
    }

    async tasksData() {
        const tasksCollection = this.db.collection('tasks');
        const newTasks= [
            {
                _id: 1,
                task: 'Pray After Waking Up'
            },
            {
                _id: 2,
                task: 'Do few warmups and pushups for fitness'
            },
            {
                _id: 3,
                task: 'Make Breakfast'
            },
            {
                _id: 4,
                task: 'Get some morning sunlight'
            }
        ];
        await tasksCollection.insertAll(newTasks);
    }

    close() {
        this.client.close();
    }
}

export default taskClient;
