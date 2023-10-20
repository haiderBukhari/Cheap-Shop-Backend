import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
        type: string,
        required: [true, "Please Enter Your Name"],
        trim: true,
        maxLength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: string,
        required: [true, "Please Enter Your Email"],
        unique: [true, "Email Already Exists"],
        validate: [validator.isEmail, "Please Enter Valid Email"]
    },
    password: {
        type: string,
        required: [true, "Please Enter Your Password"],
        minLength: [6, "Password must be atleast 6 characters long"],
    },
    avatar: {
        public_id:{
            type: string,
            required: [true, "Please Enter Image id"]
        },
        url: {
            type: string,
            required: [true, "Please Enter Image url"]
        }
    },
    role: {
        type: string,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    resetpasswordtoken: string,
    resetpasswordtime: Date
})

const userModel = mongoose.model('Users', userSchema)

export default userModel