import taskClient from "../database/mongo_database.js";

class CreateTask {
    static async create(req, res) {
        const taskModel = new taskClient();
        await taskModel.connect();
        await taskModel.createTask();
        await taskModel.close();
        res.status(200).json();
    }
}

export default CreateTask;