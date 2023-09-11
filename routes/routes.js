import { Router } from 'express';

// defined tasks endpoints are defined and imported 
import createTask from '../tasks/createTask.js';
import retrieveTask from '../tasks/retrieveTask.js';
import updateTask from '../tasks/updateTask.js';
import deleteTask from '../tasks/deleteTask.js';

const router = Router();

// Five Basic Endpoints are to be defined for CRUD Operations

router.get('/tasks', retrieveTask.task);

router.get('/tasks/{id}', retrieveTask.taskId);

router.post('/tasks', createTask.create);

router.put('/tasks/{id}', updateTask.update);

router.delete('/tasks/{id}', deleteTask.delete);

export default router;