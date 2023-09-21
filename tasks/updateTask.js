import TaskSchema from "../database/taskSchema.js";

class UpdateTask {
    static async update(req, res) { // Callback PUT method to update a task
        try {
            const taskId = req.params.id; // Fetch the ID from the paramaters
            const update = req.body; // Fetch the task to be updated from the request body
            const newModel = new TaskSchema(); // Instantiate the task schema
            await newModel.connect(); // Connect to the database
            const result = await newModel.updateTask(taskId, update);
            await newModel.close(); // Close the connection

            if (result && result.modifiedCount === 1) {
                // Verify if the task has been updated
                res.status(200).json({
                    message: 'Task has been updated successfully'
                });
            } else {
                res.status(404).json({
                    error: 'Task cannot be updated'
                });
            }
        } catch (error) {
            // Error Handling
            console.error('Error updating task: ', error);
            res.status(500).json({
                error: 'An error occured updating the task'
            });
        }
    }
}

export default UpdateTask;
