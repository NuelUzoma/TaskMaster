// Import the mongo client to create the connection
import { MongoClient } from 'mongodb';

// Host, Port and Database for MongoClient
const host = 'localhost';
const port = 27017;
const database = 'taskmaster';

// The URL to connect to the database
const mongoUrl = `mongodb://${host}:${port}/${database}`;

// Instantiate a new function of the connection and export to tasks and users
const client = new MongoClient(mongoUrl);

export default client;
