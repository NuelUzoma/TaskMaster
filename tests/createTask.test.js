import { assert } from 'chai';
import TaskSchema from '../database/taskSchema.js';

const taskModel = new TaskSchema();

describe('Create Task Test', () => {
    let taskId;

    before(async function () {
        // Connect to the database
        await taskModel.connect();
    });

    after(async function () {
        // Close the connection to the database
        await taskModel.close();
    });

    it('should create a new task', async function () {
        // create a new task
        const newTask = {
            title: 'Test Task',
            description: 'Create this test task',
            completed: true
        };

        const result = await taskModel.createTask(newTask);
        taskId = result.insertedId;

        assert.isNotNull(taskId, 'Task ID should not be null');
    });
});
