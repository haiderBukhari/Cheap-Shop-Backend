import app from '../index.js'
import { connectDatabase } from '../config/database.js'
import { configDotenv } from 'dotenv'
configDotenv()

const PORT = process.env.PORT || 3000
app.listen(PORT, '127.0.0.1', async ()=>{
    connectDatabase()
    console.log("Server has started");
})