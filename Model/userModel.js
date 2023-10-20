import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        trim: true,
        maxLength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: [true, "Email Already Exists"],
        validate: [validator.isEmail, "Please Enter Valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [6, "Password must be atleast 6 characters long"],
    },
    avatar: {
        public_id:{
            type: String,
            required: [true, "Please Enter Image id"]
        },
        url: {
            type: String,
            required: [true, "Please Enter Image url"]
        }
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    resetpasswordtoken: String,
    resetpasswordtime: Date
})

const userModel = mongoose.model('Users', userSchema)
export default userModel