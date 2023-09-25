// Import the client to connect to the users collection of the database
import client from './db_connection.js';
import { ObjectId } from 'mongodb';

class UserSchema {
    constructor() {
        client.connect().then(() => {
            // Connect to the users collection of the database
            this.db = client.db('taskmaster');
            this.collection = this.db.collection('users');
            // Create a unique index on the 'email' and 'username' field
            this.collection.createIndex({ email: 1, username: 1 }, { unique: true });
            console.log("Connected to MongoDB Server");
        }).catch((error) => {
            console.error(error); // On error, it should throw an error
        });
    }

    async connect() {
        await client.connect() // This method connects to the database
    }

    async createUser({username, email, password}) {
        // Creates an user with the above arguments
        try {
            const newUser = {
                username,
                email,
                password
            };

            // Inserts the new user into the collection
            const result = await this.collection.insertOne(newUser);

            if (result) {
                return result.insertedId;
            } else {
                throw new Error('User insertion failed');
            }
        } catch (error) {
            // Error Handling
            if (error.code === 11000) {
                throw new Error('User with the same username or email already exists');
            } else {
                console.error("Error creating user: ", error);
                throw error;
            }
        }
    }

    async findUserByUsername(username) {
        // Find a user by its username
        try{
            const user = await this.collection.findOne({
                username: username
            });
            return user;
        } catch (error) {
            // Error Handling
            console.error("Error finding user by username: ", error);
        }
    }

    async getUsers() {
        // Get all users in the database
        try {
            const result = await this.collection.find().toArray(); // Retrieve Users from the database
            return result;
        } catch (error) {
            // Error Handling
            console.error('Error getting users: ', error);
        }
    }

    async getUserId(usersId) {
        try {
            console.log('Retrieving users by ID: ', usersId);

            // Check if taskId is defined
            if (usersId === undefined) {
                throw new Error('User ID is undefined');
            }

            // Trim any trailing space from the task ID
            const trimmedUserId = usersId.trim();

            if(trimmedUserId.length !== 24 || !/^[0-9a-fA-F]+$/.test(trimmedUserId)) {
                // Checks if it is 24 in length and makes use of Regex to check
                throw new Error('Invalid input for taskId')
            }

            const result = await this.collection.findOne({
                _id: new ObjectId(trimmedUserId)
            });
            return result;
        } catch (error) {
            // Error Handling
            console.error('Error retrieving user: ', error);
        }
    }

    async close() {
        // Close the mongodb connection
        await client.close();
    }
}

export default UserSchema;
