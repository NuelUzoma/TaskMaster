import bcrypt from 'bcrypt'; // Used for authentication
import UserSchema from "../database/userSchema.js";
import Jwt from 'jsonwebtoken'; // Send a token to the user for authentication

class RegisterUser {
    static async register(req, res) { // Callback method used in the routes middleware
        // Register a new user 
        try {
            const {username, email, password} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password using bcrypt
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
            // Check the username input if it corresponds with the database
            const user = userData.findUserByUsername(username);
            if (!user) {
                res.status(401).json({
                    error: "Invalid username or password"
                });
            }
            // Check password match using bcrypt
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                res.status(401).json({
                    error: "Invalid username or password"
                });
            }
            // JWT Authentication for successful user login.
            const sec_key = process.env.JWTSECRETKEY;
            const token = Jwt.sign(
                { userId: user._id },
                sec_key,
                { expiresIn: '1h'
            });
            res.status(200).json({
                token
            });
        } catch (error) {
            console.error("Error loggining in: ", error);
            res.status(500).json({
                error: "Internal server error"
            });
        }
    }
}

export default RegisterUser;
