import TaskSchema from "../database/taskSchema.js";

class CreateTask {
    static async create(req, res) { // Callback POST method to create a task
        try {
            const task = req.body;
            const taskModel = new TaskSchema(); // Instantiate the task schema
            await taskModel.connect(); // Connect to the database
            await taskModel.createTask(task);
            await taskModel.close(); // Close the database connection
            res.status(200).json({
                message: 'Task has been created'
            });
        } catch (error) {
            // Error Handling
            console.error('Error creating task: ', error);
            res.status(500).json({
                error: 'An error occured creating the task'
            });
        }
    }
}

export default CreateTask;
