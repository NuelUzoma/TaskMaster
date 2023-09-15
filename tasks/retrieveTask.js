import TaskSchema from "../database/taskSchema.js";

class RetrieveTask {
    static async retrieve(req, res) { // Callback GET method to retrieve a task
        const taskModel = new TaskSchema(); // Instantiate the task schema
        await taskModel.connect(); // Connect to the database
        await taskModel.retrieveTask();
        await taskModel.close(); // Close the connection
        res.status(200).json();
    }
}

export default RetrieveTask;
