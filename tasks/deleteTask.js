import TaskSchema from "../database/taskSchema.js";

class DeleteTask {
    static async deletes(req, res) { // Callback DELETE method to delete a task
        const newModel = new TaskSchema(); // Instantiate the task schema
        await newModel.connect(); // Connect to the database
        await newModel.deleteTask();
        await newModel.close(); // Close the connection
        res.status(200).json();
    }
}

export default DeleteTask;
