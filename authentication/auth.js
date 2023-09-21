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
                userId
            });
        } catch (error) {
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
                res.status(401).json({
                    error: "Invalid username or password"
                });
                return;
            }
            // Check password match using bcrypt
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                res.status(401).json({
                    error: "Invalid username or password"
                });
                return;
            }
            // JWT Authentication for successful user login.
            const sec_key = process.env.JWT_SECRET;
            const token = Jwt.sign(
                { userId: user._id },
                sec_key,
                { expiresIn: '1h'}
                );
            res.status(200).json({
                token
            });
            await userData.close();
        } catch (error) {
            console.error("Error loggining in: ", error);
            res.status(500).json({
                error: "Internal server error"
            });
        }
    }

    static async user(req, res) {
        try {
            const userData = new UserSchema();
            await userData.connect();
            const users = await userData.getUsers();
            await userData.close();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error retrieving users');
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    }

    static async userId(req, res) {
        try {
            const usersId = req.params.id;
            const userData = new UserSchema();
            await userData.connect();
            const result = await userData.getUserId(usersId);
            await userData.close();

            if (result) {
                res.status(200).json({
                    message: 'User has been retrieved successfully',
                    user: result
                });
            } else {
                res.status(404).json({
                    error: 'User not found'
                });
            }
        } catch (error) {
            console.error('Error retrieving user by ID: ', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    }
}

export default RegisterUser;
