import TaskSchema from "../database/taskSchema.js";

class RetrieveTask {
    static async retrieve(req, res) { // Callback GET method to retrieve a task
        try {
            const taskModel = new TaskSchema(); // Instantiate the task schema
            await taskModel.connect(); // Connect to the database
            const tasks = await taskModel.retrieveTask();
            await taskModel.close(); // Close the connection
            res.status(200).json(tasks);
        } catch (error) {
            // Error Handling
            console.error('Error retrieving task: ', error);
            res.status(500).json({
                error: 'An error occured retrieving the task'
            });
        }
    }

    static async retrieveId(req, res) {
        try{ // Callback method to retrieve a task by ID
            const taskId = req.params.id; // Get the ID from the parameters
            const taskModel = new TaskSchema(); // Instantiate a new instance of the schema
            await taskModel.connect(); // Connect to the database
            const result = await taskModel.retrieveTaskId(taskId); // Get the result from the taskId
            await taskModel.close(); // Close the database connection

            if (result) {
                res.status(200).json({
                    message: 'Task has been retrieved successfully',
                    task: result // return as response upon successful retrieval
                });
            } else {
                res.status(400).json({
                    error: 'Task not found'
                });
            }
        } catch (error) {
            // Error Handling
            console.error('Error retrieving task by ID: ', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    }
}

export default RetrieveTask;
