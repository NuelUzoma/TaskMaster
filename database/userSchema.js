// Import the client to connect to the users collection of the database
import client from './db_connection.js';
import { ObjectId } from 'mongodb';

class UserSchema {
    constructor() {
        client.connect().then(() => {
            // Connect to the users collection of the database
            this.db = client.db('taskmaster');
            this.collection = this.db.collection('users');
            console.log("Connected to MongoDB Server")
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
                console.error("Error creating user: ", error);
                throw error;
        }
    }


    async findUserById(userId) {
        // Find a user by its user_id
        try {
            // Convert the user id into a MongoDB ObjectId type to send the unique query
            const user = await this.collection.findOne({_id: new ObjectId(userId)});
            return user;
        } catch (error) {
            console.error("Error finding user: ", error);
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
            console.error("Error finding user by username: ", error);
        }
    }

    async close() {
        // Close the mongodb connection
        await client.close();
    }
}

export default UserSchema;
