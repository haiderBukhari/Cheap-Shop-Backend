import {ErrorHandler} from '../utils/errorHandeling.js'
import productModel from '../Model/productModel.js'
import { validationResult } from 'express-validator';
const handler = new ErrorHandler();

export const createProduct = async (req, res, next) => {
    try {
        const result = validationResult(req);
        if(!result.isEmpty()){
            throw new Error(result.array()[0].msg)
        }
        const createdProduct = await productModel.create(req.body);
        res.status(200).json({
            status: "success",
            message: "Product Created Successfully",
            products: createdProduct
        })
    }
    catch (err) {
        next(handler.Errors(err.message, 404, req, res, next))
    }
}
export const getproduct = async (req, res, next) => {
    try {
        const productsList = {}
        const sort = {}
        if(req.query.sort){
            if(req.query.sort == 'price')sort.price = 1;
            else if(req.query.sort == '-price')sort.price = -1;
            else if(req.query.sort == 'ratings')sort.ratings = 1;
            else if(req.query.sort == '-ratings')sort.ratings = -1;
        }
        if(req.query.name){
            const regex = new RegExp(req.query.name, 'i')
            productsList.name = {$regex: regex};
        }
        if(req.query.description){
            const regex = new RegExp(req.query.description, 'i')
            productsList.description = {$regex: regex};
        }
        if(req.query.category)productsList.category = req.query.category;
        if(req.query.ratings)productsList.ratings = {$gte: req.query.ratings*1};
        if(req.query.stock)productsList.stock  = {$gt: 0};
        const productData = await productModel.find(productsList).sort(sort)
        res.status(200).json({
            status: "success",
            length: productData.length,
            products: productData
        })
    }
    catch (err) {
        next(handler.Errors(err.message, 404, req, res, next))
    }
}

export const getSingleProduct = async (req, res, next) => {
    try {
        const ProductData = await productModel.findById(req.params.id)
        if(!ProductData){throw new Error("")}
        res.status(200).json({
            status: "success",
            product: ProductData
        })
    }
    catch (err) {
        next(handler.Errors("Product Not Found", 404, req, res, next))
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const result = validationResult(req);
        if(!result.isEmpty()){
            throw new Error(result.array()[0].msg)
        }
        let product = await productModel.findById(req.params.id)
        if(!product){throw new Error("Product Not Found")}
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.status(200).json({
            status: "success",
            message: "Product Updated Successfully",
            product: updatedProduct
        })
    }
    catch(err){
        next(handler.Errors(err.message, 404, req, res, next))
    }
}

export const deleteProduct = async (req, res, next) => {
    try{
        let product = await productModel.findById(req.params.id)
        if(!product){throw new Error("")}
        await productModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "success",
            message: "Product Deleted Successfully"
        })
    }
    catch(err){
        next(handler.Errors("Product Not Found", 404, req, res, next))
    }
}