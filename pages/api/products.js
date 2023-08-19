import { Product } from "../../models/product";
import { mongooseConnect } from "../../lib/mongoose";
export default async function handle(req,res){
    const {method} = req;
    await mongooseConnect();

    if(method==='GET'){
        if(req.query?.id){
            res.json(await Product.findOne({_id:req.query.id}))
        }
        else{
            res.json(await Product.find({}))
        }
    }

    if (method==='GET'){
        const products = await Product.find({})
        res.json(products)
    }
    if (method==='POST'){
        const {title,categoryName, description, price,images, properties} = req.body;
        const productDoc = await Product.create({
            title,categoryName,description,price,images, properties
        })
        res.json(productDoc)
        
    }
    
    if (method==='PUT'){
        try{
            console.log('put request')
            const {title,categoryName, description, price,images, _id,properties} = req.body;
            let updatedProduct=null
            if(_id){
                //update existing document
                updatedProduct  = await Product.findByIdAndUpdate(_id,{
                    title,categoryName,description,price,images,properties
                })
                }
                res.json(updatedProduct)
                
        }
        catch(err)
        {
            res.status(500).json({error:err})
        }
    }

    if (method==='DELETE'){
        if(req.query?.id){
            await Product.deleteOne({_id:req.query?.id});
            res.json(true);
        }

}
}
