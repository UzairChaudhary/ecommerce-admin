import { Category } from "../../models/categories";
import {mongooseConnect} from '@/lib/mongoose'
export default async function handle( req, res){

    const {method } = req
    await mongooseConnect()

    if (method==='GET'){
        res.json(await Category.find({}).populate('parent'))
    }


    if (method==='POST'){
        const {name, parentCategory, Properties} = req.body;
        //console.log({name,parentCategory,Properties})
        res.json(await Category.create({
            name, 
            parent:parentCategory || undefined,
            Properties,
        }))
    }


    if (method==='PUT'){
        const {name, parentCategory, Properties, _id} = req.body;

        res.json(await Category.updateOne({_id}, {
            name,
            parent:parentCategory || undefined,
            Properties,
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