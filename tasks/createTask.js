import TaskSchema from "../database/taskSchema.js";

class CreateTask {
    static async create(req, res) {
        const taskModel = new TaskSchema();
        await taskModel.connect();
        await taskModel.createTask();
        await taskModel.close();
        res.status(200).json();
    }
}

export default CreateTask;