import TaskSchema from "../database/taskSchema.js";

class DeleteTask {
    static async deletes(req, res) {
        const newModel = new TaskSchema();
        await newModel.connect();
        await newModel.deleteTask();
        await newModel.close();
        res.status(200).json();
    }
}

export default DeleteTask;