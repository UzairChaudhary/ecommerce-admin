import Layout from "@/components/layout";
import axios from "axios";
import {useState, useEffect} from 'react';

export default function Categories(){
    
    const [name, setname] = useState('');
    const [categories, setcategories] = useState([]);
    const [parentCategory, setparentCategory] = useState('');

    useEffect(() => {
        
            fetchCategories()
        
    }, []);

    const fetchCategories = async () => {
        await axios.get('/api/categories').then(result =>{
            setcategories(result.data)
            
        })
    } 

    async function saveCategory(e){
        e.preventDefault()
        await axios.post('/api/categories', {name, parentCategory})
        setname('')
        fetchCategories()
    }

    return(
        <Layout>
            <h1>Categories</h1>
            <label>New Category Name</label>
            <form className="flex gap-1" onSubmit={saveCategory}>
                <input 
                className="mb-0" 
                type="text" 
                placeholder={"Category Name"}
                onChange={(e)=> setname(e.target.value)}
                value={name}
                
                ></input>
                <select className="mb-0" value={parentCategory} onChange={ev => setparentCategory(ev.target.value)}>
                    <option value="0">No Parent Category</option>
                    {categories.length > 0 && categories.map((category)=>(
                        
                            // eslint-disable-next-line react/jsx-key
                            <option value={category._id}>
                            {category.name}
                            </option>
                        
                    ))}
                </select>
                <button type="submit" className="btn-primary py-1 bg-blue-900 text-white" >Save</button>
            </form>
            <table className="basic mt-4">
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Parent Category</th>
                        <th></th>

                    </tr>
                </thead> 
                <tbody>
                    {categories.length > 0 && categories.map((category)=>(
                        <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>{category?.parent?.name}</td>
                            <td><button className="btn-primary py-1 bg-blue-900 text-white mr-1">Edit</button>
                            <button className="btn-primary py-1 bg-red-900 text-white">Delete</button>
</td>
                        </tr>
                    ))}
                </tbody>   
            </table>
        </Layout>
    )
}