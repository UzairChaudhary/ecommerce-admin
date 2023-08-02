import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Layout from '@/components/layout'
import axios from "axios"
export default function DeleteProductPage(){
    const router = useRouter()
    const {id}= router.query
    const [productInfo, setproductInfo] = useState('');
    useEffect(() => {
        if (!id) return;
        const fetchProduct = async () => {
            const res = await axios.get(`/api/products?id=${id}`)
            setproductInfo(res.data)
            

        }
        fetchProduct()
    }, [id]);
    function goBack(){
        router.push('/products')
      
    }
    async function deleteProduct(){
        await axios.delete(`/api/products?id=${id}`);
        goBack();
      
    }
    
    
    return(
        <Layout>
            <h1 className="text-center">
            Do you really want to delete {productInfo.title} ?

            </h1>
            <div className="flex gap-2 justify-center">
                <button className="btn-red" onClick={deleteProduct}>Yes</button>
                <button className="btn-default" onClick={goBack}>No</button>
            </div>
        </Layout>
    )
  
}
