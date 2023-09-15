import TaskSchema from "../database/taskSchema.js";

class UpdateTask {
    static async update(req, res) {
        const newModel = new TaskSchema();
        await newModel.connect();
        await newModel.updateTask();
        await newModel.close();
        res.status(200).json();
    }
}

export default UpdateTask;