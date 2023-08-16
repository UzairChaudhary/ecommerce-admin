import { Category } from "../../models/categories";
import {mongooseConnect} from '@/lib/mongoose'
export default async function handle( req, res){

    const {method } = req
    await mongooseConnect()

    if (method==='GET'){
        res.json(await Category.find({}).populate('parent'))
    }
    if (method==='POST'){
        const {name, parentCategory} = req.body;
        res.json(await Category.create({
            name, 
            parent:parentCategory}))
    }
}