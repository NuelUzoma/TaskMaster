import express from 'express';
import router from './routes/routes.js';

const port = 5001;

const app = express();

app.use(express.json()); // used globally as a middleware to parse JSON requests
app.use('/', router); // makes use of the routes defined in the routes file

// Listen on port 5001
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
