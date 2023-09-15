import TaskSchema from "../database/taskSchema.js";

class CreateTask {
    static async create(req, res) { // Callback POST method to create a task
        const taskModel = new TaskSchema(); // Instantiate the task schema
        await taskModel.connect(); // Connect to the database
        await taskModel.createTask();
        await taskModel.close(); // Close the database connection
        res.status(200).json();
    }
}

export default CreateTask;
