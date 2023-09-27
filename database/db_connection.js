// Import the mongo client to create the connection
import { MongoClient } from 'mongodb';

// Host, Port and Database for MongoClient
// const host = '127.0.0.1';
// const port = 27017;
// const database = 'taskmaster';

// The URL to connect to the database
// const mongoUrl = `mongodb://${host}:${port}/${database}`;

const mongoUri = "mongodb+srv://Optimus_Prime:O1NptfbGceCQIr2m@cluster0.v3htiwa.mongodb.net/taskmaster?retryWrites=true&w=majority"

// Instantiate a new function of the connection and export to tasks and users
const client = new MongoClient(mongoUri);

export default client;
