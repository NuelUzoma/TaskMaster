import taskClient from "../database/mongo_database.js";

class DeleteTask {
    static async deletes(req, res) {
        const newModel = new taskClient();
        await newModel.connect();
        await newModel.deleteTask();
        await newModel.close();
        res.status(200).json();
    }
}

export default DeleteTask;