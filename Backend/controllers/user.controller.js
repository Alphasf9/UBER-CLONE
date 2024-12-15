import userModel from "../models/user.model.js";
import createUser from "../services/user.services.js"
import { validationResult } from 'express-validator'

const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            success: false
        })
    }

    const { fullname, email, password } = req.body;


    const hashPassword = await userModel.hashPassword(password);

    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
    });


    const token = user.generateAuthToken();

    res.status(201).json({
        token,
        user,
        message: "User Registered successfully"
    });
}

export default { registerUser }