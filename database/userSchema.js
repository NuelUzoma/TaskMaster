import client from "./db_connection.js";
import ObjectId from 'mongodb';

class UserSchema {
    constructor() {
        client.connect().then(() => {
            this.db = client.db('taskmaster');
            this.collection = this.db.collection('users');
            console.log("Connected to MongoDB Server")
        }).catch((error) => {
            console.error(error);
        });
    }

    async connect() {
        await client.connect() // Check MongoDB Connection
    }

    async createUser({username, email, password}) {
        try {
            const newUser = {
                username,
                email,
                password
            };
            const result = await this.collection.insertOne(newUser);
            return result.insertedId;
        } catch (error) {
            console.error("Error creating user: ", error);
        }
    }

    async findUserById(userId) {
        try {
            const user = await this.collection.findOne({_id: new ObjectId(userId)});
            return user;
        } catch (error) {
            console.error("Error finding user: ", error);
        }
    }

    async findUserByUsername(username) {
        try{
            const user = await this.collection.findOne(username);
            return user;
        } catch (error) {
            console.error("Error finding user by username: ", error);
        }
    }

    async close() {
        await client.close();
    }
}

export default UserSchema;
