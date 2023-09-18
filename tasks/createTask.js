import TaskSchema from "../database/taskSchema.js";

class CreateTask {
    static async create(req, res) { // Callback POST method to create a task
        try {
            const taskModel = new TaskSchema(); // Instantiate the task schema
            await taskModel.connect(); // Connect to the database
            await taskModel.createTask();
            await taskModel.close(); // Close the database connection
            res.status(200).json();
        } catch (error) {
            res.status(500).json({
                error: 'An error occured creating the task'
            });
        }
    }
}

export default CreateTask;
