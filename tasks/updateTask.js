import TaskSchema from "../database/taskSchema.js";

class UpdateTask {
    static async update(req, res) { // Callback PUT method to update a task
        const newModel = new TaskSchema(); // Instantiate the task schema
        await newModel.connect(); // Connect to the database
        await newModel.updateTask();
        await newModel.close(); // Close the connection
        res.status(200).json();
    }
}

export default UpdateTask;
