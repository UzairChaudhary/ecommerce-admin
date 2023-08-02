import Layout from "@/components/layout"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/router";
export default function NewProduct(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [goToProducts, setGoToProducts] = useState(false);

    const router = useRouter()

    const createProduct = async (ev) => {
        ev.preventDefault();
        const data = {title,description,price}
        await axios.post('/api/products',data)
        setGoToProducts(true)

        if(goToProducts){
            return(
                router.push('/products')
            )
        }
        
    }
    return(
        <Layout>
            <form onSubmit={createProduct}>
            <h1 >New Product</h1>
            <label>Product Name</label>
            <input type="text" placeholder="product name" value={title} onChange={ev => setTitle(ev.target.value)}/>
            <label>Product Description</label>
            <textarea placeholder="Description" value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
            <label>Product Price</label>
            <input placeholder="price" type="text" value={price} onChange={ev => setPrice(ev.target.value)} />
            <button className="btn-primary">Save</button>

            </form>
        </Layout>
    )
  
}
