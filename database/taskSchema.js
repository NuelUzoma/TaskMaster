// Import the client to connect to the tasks collection of the database
import client from './db_connection.js';
import { ObjectId } from 'mongodb';

const newTasks = [ // An array of sample tasks to test the tasks collection
    {
        id: 19,
        title: 'Finish project',
        description: 'Complete building my resume to apply for jobs',
        completed: false
    },
    {
        id: 20,
        title: 'Complete Task 2',
        description: 'Finish the first task on the task list',
        completed: false
    },
    {
        id: 21,
        title: 'Round-Up Specializations Project',
        description: 'Complete the final project for ALX Africa',
        completed: false
    },
    {
        id: 22,
        title: 'Purchase Groceries',
        description: 'Purchase groceries from the market',
        completed: false
    },
    {
        id: 23,
        title: 'Morning Exercise',
        description: 'Complete 30 min workout every morning',
        completed: false
    },
    {
        id: 24,
        title: 'School Resumption',
        description: 'Resume with school activities in a shortwhile',
        completed: false
    },
    {
        id: 25,
        title: 'Write Blog Post',
        description: 'Complete an extensive blog post for this TaskMaster project',
        completed: false
    },
    {
        id: 26,
        title: 'Comprehensive README.md',
        description: 'Complete a comprehensive README.md for this project',
        completed: false
    },
    {
        id: 27,
        title: 'Test',
        description: 'Testing',
        completed: false
    }
];

// The schema of the tasks collection
class TaskSchema {
    constructor() {
        client.connect().then(() => {
            // Connect to the tasks colection of the database
            this.db = client.db('taskmaster');
            this.collection = this.db.collection('tasks');
            console.log("Connected to MongoDB Server");
            return this.collection.insertMany(newTasks);
        }).catch((error) => { // On error, it should throw an error
            console.error(error);
        });
    }

    async connect() {
        const result = await client.connect(); // This method connects to the database
        return result;
    }

    async tasksData() {
        const result = await this.collection.insertMany(newTasks); // Inserts the array of tasks into the collection
        return result;
    }

    // Create Task definiton to create tasks
    async createTask(task) {
        const result = await this.collection.insertOne(task); // Inserts a task into the database
        return result;
    }

    // Retrieve Tasks from the database
    async retrieveTask() {
        const result = await this.collection.find().toArray(); // Retrieve tasks from the database
        return result;
    }

    // Retrieve Tasks by ID from the database
    async retrieveTaskId(taskId) {
        try {
            console.log('Retrieving task with ID: ', taskId);

            // Trim any trailing space from the task ID
            const trimmedTaskId = taskId.trim();

            if(trimmedTaskId.length !== 24 || !/^[0-9a-fA-F]+$/.test(trimmedTaskId)) {
                // Checks if it is 24 in length and makes use of Regex to check
                throw new Error('Invalid input for taskId')
            }

            const result = await this.collection.findOne({
                _id: new ObjectId(trimmedTaskId)
            });
            return result;
        } catch (error) {
            // Error Handling
            console.log('Error retrieving task: ', error);
            throw error;
        }
    }

    // Update a task in the database
    async updateTask(taskId, update) {
        try {
            console.log('Updating task with ID: ', taskId);

            // Trim any trailing space from the task ID
            const trimmedTaskId = taskId.trim();

            if(trimmedTaskId.length !== 24 || !/^[0-9a-fA-F]+$/.test(trimmedTaskId)) {
                // Checks if it is 24 in length and makes use of Regex to check
                throw new Error('Invalid input for taskId')
            }

            const result = await this.collection.updateOne(
                {
                    _id: new ObjectId(trimmedTaskId)
                },
                {
                    $set: update
                });
            return result;
        } catch (error) {
            // Error Handling
            console.error('Updating task failed: ', error);
            throw error;
        }
    }

    // delete a task from the database
    async deleteTask(taskId) {
        try {
            console.log('Deleting task with ID: ', taskId);

            // Trim any trailing space from the task ID
            const trimmedTaskId = taskId.trim();

            if(trimmedTaskId.length !== 24 || !/^[0-9a-fA-F]+$/.test(trimmedTaskId)) {
                // Checks if it is 24 in length and makes use of Regex to check
                throw new Error('Invalid input for taskId')
            }

            const result = await this.collection.deleteOne({
                _id: new ObjectId(trimmedTaskId)
            });
            return result;
        } catch (error) {
            // Error Handling
            console.error('Error deleting task from database: ', error);
            throw error;
        }
    }

    // Change the completion status of a task
    async toggleTaskCompletion(taskId) {
        const taskIndex = newTasks.findIndex((task) => task.id === taskId);

        if (taskIndex !== -1) { // Indicate if a match of taskId was found in the database
            try {
                // Update the task in the database asynchronously
                await this.updateTask(taskId, !newTasks[taskIndex].completed);
                // Change the status of completion of tasks
                newTasks[taskIndex].completed = !newTasks[taskIndex].completed;
                return true;
            } catch (error) {
                console.error('Error updating the task in the database: ', error);
                return false;
            }
        } else {
            return false; // Task not found
        }
    }

    // Close the MongoClient connection
    async close() {
        await client.close();
    }
}

export default TaskSchema;
