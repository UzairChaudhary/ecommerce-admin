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


    if (method==='PUT'){
        const {name, parentCategory, _id} = req.body;

        res.json(await Category.updateOne({_id}, {
            name,
            parent:parentCategory,
        }))
    }
    // delete category by id
    if (method==='DELETE'){
        try{
            const {_id} = req.query
            await Category.deleteOne({_id})
            res.json({message:'Category deleted'})
        }
        catch(error){
            res.json({message:error})
        }
    }



}