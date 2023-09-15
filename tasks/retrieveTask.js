import TaskSchema from "../database/taskSchema.js";

class RetrieveTask {
    static async retrieve(req, res) {
        const taskModel = new TaskSchema();
        await taskModel.connect();
        await taskModel.retrieveTask();
        await taskModel.close();
        res.status(200).json();
    }
}

export default RetrieveTask;