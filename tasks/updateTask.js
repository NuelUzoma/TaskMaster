import TaskSchema from "../database/taskSchema.js";

class UpdateTask {
    static async update(req, res) { // Callback PUT method to update a task
        try {
            const newModel = new TaskSchema(); // Instantiate the task schema
            await newModel.connect(); // Connect to the database
            await newModel.updateTask();
            await newModel.close(); // Close the connection
            res.status(200).json();
        } catch (error) {
            res.status(500).json({
                error: 'An error occured updating the task'
            });
        }
    }
}

export default UpdateTask;
