import Layout from "@/components/layout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import axios from "axios"
import ProductForm from "../../../components/productform";
export default function EditProductPage(){
    const [productinfo, setProductinfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        const getProducts = async () => {
            if (!id) return;
            const res = await axios.get(`/api/products?id=${id}`)
            setProductinfo(res.data)
        }
        getProducts()
    }, [id]);
    
    return(
        <Layout>
            <h1>Edit Product</h1>
            {productinfo && (
                <ProductForm {...productinfo} />
            )}
            
        </Layout>
    )
  
}
