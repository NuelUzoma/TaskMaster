import TaskSchema from "../database/taskSchema.js";

class UpdateTask {
    static async update(req, res) { // Callback PUT method to update a task
        try {
            const taskId = req.params.id;
            const update = req.body;
            const newModel = new TaskSchema(); // Instantiate the task schema
            await newModel.connect(); // Connect to the database
            const result = await newModel.updateTask(taskId, update);
            await newModel.close(); // Close the connection

            if (result && result.modifiedCount === 1) {
                res.status(200).json({
                    title: 'Task has been updated'
                });
            } else {
                res.status(404).json({
                    error: 'Task cannot be updated'
                });
            }
        } catch (error) {
            console.error('Error updating task: ', error);
            res.status(500).json({
                error: 'An error occured updating the task'
            });
        }
    }
}

export default UpdateTask;
