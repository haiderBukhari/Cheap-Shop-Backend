import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name"],
        trim: true,
        maxLength: [100, 'Product Name cannot exceed 100 characters'],
        unique: [true, 'Product Name must be unique'],
        index: true,
    },
    price: {
        type: Number,
        required: [true, "Please Enter Product Price"],
        trim: true,
        maxLength: [10, 'Product Name cannot exceed 10 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Please Enter Product Description"],
        trim: true,
        index: true
    },
    ratings: {
        type: Number,
        default: 0
    },
    images:[
        {
            public_id: {
                type: String,
                required: [true, "Please Enter Image id"]
            },
            url: {
                type: String,
                required: [true, "Please Enter Image url"]
            }
        }
    ],
    category: {
        type: String,
        trim: [true, "Please Select Category for this Product"],
        enum: {
            values:[
                'Electronics',
                'Cameras',
                'Laptop',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes',
                'Shoes',
                'Beauty/Health',
                'Medicines',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message:`This category is not supported`
        }
    },
    seller: {
        type: String,
        required: [true, "Please Enter Product Seller"],
        trim: true
    },
    stock: {
        type: Number,
        required: [true, "Please Enter Product Stock"],
        maxLength: [5, 'Product Name cannot exceed more then 5 characters'],
        default: 0
    },
    totalreviews: {
        type: Number, 
        default: 0
    },
    reviews: [
        {
            name:{
                type: String,
                required: [true, "Please Enter Your Name"],
                trim: true
            },
            rating: {
                type: Number,
                required: [true, "Please Enter Product Rating"],
            },
            message: {
                type: String,
                required: [true, "Please Enter Your Message"],
                trim: true
            },
        }
    ],
    createdAt: {
        type: Date, 
        default: Date.now
    }
})

const productModel = mongoose.model('Products', productSchema)

export default productModel