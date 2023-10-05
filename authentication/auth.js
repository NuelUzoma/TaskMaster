import bcrypt from 'bcrypt'; // Used for authentication
import UserSchema from "../database/userSchema.js";
import Jwt from 'jsonwebtoken'; // Send a token to the user for authentication
import dotenv from 'dotenv'; // Import the dotenv module

dotenv.config(); // Load environment variables from .env file for JWT secret key


class RegisterUser {
    static async register(req, res) { // Callback method used in the routes middleware
        // Register a new user 
        try {
            const {username, email, password} = req.body;
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt); // Hash the password using bcrypt
            const userData = new UserSchema(); // Instantiate the user schema, to be used in this method
            await userData.connect();
            const userId = await userData.createUser({
                username,
                email,
                password: hashedPassword // Create a new user with the hashed password to the database
            });
            await userData.close(); // Close the database connection
            res.status(201).json({
                message: "User registered successfully",
                userId // Displays the ID of the registered user
            });
        } catch (error) {
            // Error Handling
            console.error("Error registering user: ", error);
            res.status(500).json({
                error: "Internal server error"
            });
        }
    }

    static async login(req, res) {
        // Login the user
        try {
            const {username, password} = req.body;
            const userData = new UserSchema(); // Instantiate the user schema
            await userData.connect();
            // Check the username input if it corresponds with the database
            const user = await userData.findUserByUsername(username);
            if (!user) {
                // Validate username
                res.status(401).json({
                    error: "Invalid username or password"
                });
                return;
            }
            // Check password match using bcrypt
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                // Validate password
                res.status(401).json({
                    error: "Invalid username or password"
                });
                return;
            }
            // JWT Authentication for successful user login.
            const sec_key = process.env.JWT_SECRET;
            Jwt.sign( // Generate a token for signing in but wont be displayed for security purposes
                { userId: user._id },
                sec_key,
                { expiresIn: '1h'}
                );
            res.status(200).json({
                message: 'Login Successful'
            });
            await userData.close(); // Close the database connection
        } catch (error) {
            // Error Handling
            console.error("Error loggining in: ", error);
            res.status(500).json({
                error: "Internal server error"
            });
        }
    }

    static async user(req, res) {
        // Retrieve all the users from the database
        try {
            const userData = new UserSchema(); // Instantiate the database schema
            await userData.connect(); // Connect to the database
            const users = await userData.getUsers(); // Get the users which will be displayed as response
            await userData.close(); // Close the database connection
            res.status(200).json(users);
        } catch (error) {
            // Error Handling
            console.error('Error retrieving users');
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    }

    static async userId(req, res) {
        // Retrieve users from the database from its ID
        try {
            const usersId = req.params.id; // Retrieve the ID from the parameters
            const userData = new UserSchema(); // Instantiate the database schema
            await userData.connect(); // Connect to the database
            const result = await userData.getUserId(usersId); // Get the User from its ID
            await userData.close(); // Close the connection

            if (result) {
                res.status(200).json({
                    message: 'User has been retrieved successfully',
                    user: result // Display the User details in the response
                });
            } else {
                res.status(404).json({
                    error: 'User not found'
                });
            }
        } catch (error) {
            // Error Handling
            console.error('Error retrieving user by ID: ', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    }
}

export default RegisterUser;
