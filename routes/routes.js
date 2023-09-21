import { Router } from 'express';

// defined tasks endpoints are defined and imported 
import CreateTask from '../tasks/createTask.js';
import RetrieveTask from '../tasks/retrieveTask.js';
import UpdateTask from '../tasks/updateTask.js';
import DeleteTask from '../tasks/deleteTask.js';
import RegisterUser from '../authentication/auth.js';

const router = Router();

// Endpoints are to be defined for CRUD Operations

router.get('/tasks', RetrieveTask.retrieve);

router.get('/tasks/retrieve/:id', RetrieveTask.retrieveId);

router.post('/tasks/create', CreateTask.create);

router.put('/tasks/update/:id', UpdateTask.update);

router.delete('/tasks/delete/:id', DeleteTask.deletes);

router.post('/register', RegisterUser.register);

router.post('/login', RegisterUser.login);

export default router;
