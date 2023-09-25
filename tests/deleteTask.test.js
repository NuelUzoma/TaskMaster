import { assert, expect } from 'chai';
import TaskSchema from '../database/taskSchema.js';

const taskModel = new TaskSchema();

describe('Delete a Task', async function() {
    let taskId;

    before(async function () {
        // Connect to the database
        await taskModel.connect();
    });

    after(async function () {
        // Close the connection
        await taskModel.close();
    });

    it('should throw an error for undefined task ID', async function () {
        try {
            await taskModel.deleteTask(undefined);
            // If the function doent throw an error, fail the test
            expect.fail('Expected an error for undefined task ID');
        } catch (error) {
            expect(error.message).to.equal('Task ID is undefined');
        }
    });

    it('should throw an error for invalid taskId format', async function () {
        try {
          await taskModel.deleteTask('invalid-task-id');
          // If the function does not throw an error, fail the test
          expect.fail('Expected an error for invalid taskId format');
        } catch (error) {
          // Check if the error message matches
          expect(error.message).to.equal('Invalid input for taskId');
        }
      });
});
