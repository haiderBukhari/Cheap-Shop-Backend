import express from "express";
const productRouter = express.Router();
import { body } from "express-validator";

import { getproduct, 
        createProduct, 
        getSingleProduct, 
        updateProduct, 
        deleteProduct} from "../Controller/productController.js";
        
const Productverification = [
        body('name')
        .trim()
        .not()
        .isEmpty().withMessage('Name is Required')
        .isLength({max:100}).withMessage('Name cannot exceed 100 characters'),
        body('price')
        .not()
        .isEmpty().withMessage('Price is Required')
        .isLength({max:10}).withMessage('Price cannot exceed 10 characters'),
        body('description')
        .not()
        .isEmpty().withMessage('Description is Required')
];
const UpdateVerification = [
        body('name')
        .optional()
        .trim()
        .not()
        .isEmpty().withMessage('Name is Required')
        .isLength({max:100}).withMessage('Name cannot exceed 100 characters'),
        body('price')
        .optional()
        .not()
        .isEmpty().withMessage('Price is Required')
        .isLength({max:10}).withMessage('Price cannot exceed 10 characters'),
        body('description')
        .optional()
        .not()
        .isEmpty().withMessage('Description is Required')
];

productRouter.route('/products').get(getproduct).post(Productverification,createProduct)
productRouter.route('/products/:id').get(getSingleProduct).patch(UpdateVerification, updateProduct).delete(deleteProduct)
export default productRouter