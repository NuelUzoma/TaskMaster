import taskClient from "../database/mongo_database.js";

class RetrieveTask {
    static async retrieve(req, res) {
        const taskModel = new taskClient();
        await taskModel.connect();
        await taskModel.retrieveTask();
        await taskModel.close();
        res.status(200).json();
    }
}

export default RetrieveTask;