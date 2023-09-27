// Import the mongo client to create the connection
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'; // Import the dotenv module

dotenv.config(); // Load environment variables from .env file for MongoDB URI


// Host, Port and Database for MongoClient
// const host = '127.0.0.1';
// const port = 27017;
// const database = 'taskmaster';

// The URL to connect to the database
// const mongoUrl = `mongodb://${host}:${port}/${database}`;

const mongoUri = process.env.MONGODB_URI;

// Instantiate a new function of the connection and export to tasks and users
const client = new MongoClient(mongoUri);

export default client;
