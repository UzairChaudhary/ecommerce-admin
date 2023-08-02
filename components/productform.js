import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/router";

export default function ProductForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice,
    images
}){

    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    //const [goToProducts, setGoToProducts] = useState(false);

    const router = useRouter()
    
        const saveProduct = async (ev) => {
            ev.preventDefault();
            const data = {title,description,price}
            if(_id){
                //Update
                await axios.put('/api/products',{...data,_id})
            }
            else{
                //Create
                await axios.post('/api/products',data)
            }
            
            router.push('/products')
            //setGoToProducts(true)
    
            // if(goToProducts){
            //     return(
            //         router.push('/products')
            //     )
            // }
            
        }
    
    
    return(
        
            <form>
            
            <label>Product Name</label>
            <input type="text" placeholder="product name" value={title} onChange={ev => setTitle(ev.target.value)}/>
            <label>Photos</label>
            <div className="mb-2">
                {!images?.length && (
                    <p>No images uploaded</p>

                )}
            </div>
            <label>Product Description</label>
            <textarea placeholder="Description" value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
            <label>Product Price</label>
            <input placeholder="price" type="text" value={price} onChange={ev => setPrice(ev.target.value)} />
            <button className="btn-primary" type="save" onClick={(e)=> saveProduct(e)}>Save</button>

            </form>
        
    )
  
}
