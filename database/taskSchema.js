// Import the client to connect to the tasks collection of the database
import client from './db_connection.js';

const newTasks = [ // An array of sample tasks to test the tasks collection
    {
        id: 1,
        title: 'CV Completion',
        description: 'Complete building my resume to apply for jobs',
        completed: false
    },
    {
        id: 2,
        title: 'Complete Task 1',
        description: 'Finish the first task on the task list',
        completed: false
    },
    {
        id: 3,
        title: 'Round-Up Specializations Project',
        description: 'Complete the final project for ALX Africa',
        completed: false
    },
    {
        id: 4,
        title: 'Purchase Groceries',
        description: 'Purchase groceries from the market',
        completed: false
    },
    {
        id: 5,
        title: 'Morning Exercise',
        description: 'Complete 30 min workout every morning',
        completed: false
    },
    {
        id: 6,
        title: 'School Resumption',
        description: 'Resume with school activities in a shortwhile',
        completed: false
    },
    {
        id: 7,
        title: 'Write Blog Post',
        description: 'Complete an extensive blog post for this TaskMaster project',
        completed: false
    },
    {
        id: 8,
        title: 'Comprehensive README.md',
        description: 'Complete a comprehensive README.md for this project',
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
        }).catch((error) => { // On error, it should throw an error
            console.error(error);
        });
    }

    async connect() {
        await client.connect(); // This method connects to the database
    }

    async tasksData() {
        await this.collection.insertMany(newTasks); // Inserts the array of tasks into the collection
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
