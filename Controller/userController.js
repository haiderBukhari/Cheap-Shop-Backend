import userModel from "../Model/userModel"
import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs'
import ErrorHandler from '../utils/errorHandeling.js'

const handler = new ErrorHandler();

export default RegisterUser = async (req, res, next) => {
    try{
        const result = validationResult(req);
        if(!result.isEmpty()){
            throw new Error(result.array()[0].msg)
        }
        const password = await bcrypt.hash(req.body.password, 12);
        const registerationDetail = {...req.body, password}
        await userModel.create(req.body);
        req.status(200).json({
            status: "success",
            message: "User Registered Successfully"
        })
    }catch(err){
        next(handler.Errors(err.message, 404, req, res, next));
    }
}
