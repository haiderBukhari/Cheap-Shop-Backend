import mongoose from "mongoose";

export const connectDatabase = async () => {
    await mongoose.connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((prod)=>{console.log("MongoDB DataBase is Connected Successfully")
    }).catch((err)=>console.log(err))
}