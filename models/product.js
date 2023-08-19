import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    categoryName:{
        type: mongoose.Types.ObjectId,
        ref: 'Category',
    },
    description:String,
    price:{
        type:Number,
        required:true
    },
    images:[{
        type:String
        
    }],
    properties:{
        type:Object
    }
})

export const Product = models.Product || model('Product', ProductSchema);