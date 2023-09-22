import { Router } from 'express';

// Defined tasks endpoints are defined and imported 
import CreateTask from '../tasks/createTask.js';
import RetrieveTask from '../tasks/retrieveTask.js';
import UpdateTask from '../tasks/updateTask.js';
import DeleteTask from '../tasks/deleteTask.js';
import RegisterUser from '../authentication/auth.js';

const router = Router();

// Endpoints for CRUD Operations

router.get('/tasks', RetrieveTask.retrieve); // retrieve callback method to get all users

router.get('/tasks/retrieve/:id', RetrieveTask.retrieveId); // retrieveId callback method to get users by Id

router.post('/tasks/create', CreateTask.create); // create CRUD method to create a new task

router.put('/tasks/update/:id', UpdateTask.update); // update CRUD method to update an existing task

router.delete('/tasks/delete/:id', DeleteTask.deletes);// deletes method to delete an existing task

// Endpoints of users, registration and login

router.post('/register', RegisterUser.register);// register method to register a new user

router.post('/login', RegisterUser.login);// login method to login

router.get('/users', RegisterUser.user);// user method to retrieve all users from the database

router.get('/users/:id', RegisterUser.userId);// userId method to retrieve all users by its Id

export default router;
