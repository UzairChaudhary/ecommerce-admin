import Layout from "@/components/layout"
import Link from "next/link"
import { useEffect } from "react";
import axios from "axios"

export default function Products(){

    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get('/api/products')
            console.log(res.data)
        }
        getProducts()
    }, []);
    return(
        <Layout>
            <Link href={'/products/new'} className="bg-blue-900 text-white py-1 px-2 rounded-md">Add new Product</Link>
        </Layout>
    )
  
}
