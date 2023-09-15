import bcrypt from 'bcrypt';
import UserSchema from "../database/userSchema.js";
import Jwt from 'jsonwebtoken';

class RegisterUser {
    static async register(req, res) {
        try {
            const {username, email, password} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const userData = new UserSchema();
            await userData.connect();
            const userId = await userData.createUser({ username, email, password: hashedPassword });
            await userData.close();
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
        try {
            const {username, password} = req.body;
            const userData = new UserSchema();
            const user = userData.findUserByUsername(username);
            if (!user) {
                res.status(401).json({
                    error: "Invalid username or password"
                });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                res.status(401).json({
                    error: "Invalid username or password"
                });
            }
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
