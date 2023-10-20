import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productRouter from './Routes/productRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import {ErrorHandler} from './utils/errorHandeling.js'

const app = express();
app.use(express.json())
app.use(morgan('dev'))
app.use(cors());

app.use('/api/v1', productRouter)
app.use('/api/v1', userRoutes)

app.use(ErrorHandler)
export default app;