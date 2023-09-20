import TaskSchema from "../database/taskSchema.js";

class DeleteTask {
    static async deletes(req, res) { // Callback DELETE method to delete a task
        try {
            const taskId = req.params.id; // Get the task ID from the request parameters
            console.log('Deleting task: ', taskId);
            const newModel = new TaskSchema(); // Instantiate the task schema
            await newModel.connect(); // Connect to the database
            const result = await newModel.deleteTask(taskId);
            await newModel.close(); // Close the connection

            if (result && result.deletedCount === 1) {
                res.status(200).json({
                    message: 'Task has been deleted successfully'
                });
            } else {
                res.status(404).json({
                    error: 'Task not found'
                });
            }
        } catch (error) {
            console.error('Error deleting task: ', error);
            res.status(500).json({
                error: 'An error occured deleting the task'
            });
        }
    }
}

export default DeleteTask;
