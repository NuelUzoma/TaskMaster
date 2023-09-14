import taskClient from "../database/mongo_database.js";

class UpdateTask {
    static async update(req, res) {
        const newModel = new taskClient();
        await newModel.connect();
        await newModel.updateTask();
        await newModel.close();
        res.status(200).json();
    }
}

export default UpdateTask;