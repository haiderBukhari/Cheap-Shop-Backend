import express from 'express';
import {RegisterUser} from '../Controller/userController.js'

const userRoutes = express.Router();

userRoutes.route('/register').post(RegisterUser);

export default userRoutes;