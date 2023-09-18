import TaskSchema from "../database/taskSchema.js";

class DeleteTask {
    static async deletes(req, res) { // Callback DELETE method to delete a task
        try {
            const newModel = new TaskSchema(); // Instantiate the task schema
            await newModel.connect(); // Connect to the database
            await newModel.deleteTask();
            await newModel.close(); // Close the connection
            res.status(200).json();
        } catch (error) {
            res.status(500).json({
                error: 'An error occured deleting the task'
            });
        }
    }
}

export default DeleteTask;
