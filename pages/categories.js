import Layout from "@/components/layout";
import axios from "axios";
import {useState, useEffect} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import Swal from 'sweetalert2'
export default function Categories(){
    
    const [name, setname] = useState('');
    const [categories, setcategories] = useState([]);
    const [parentCategory, setparentCategory] = useState('');

    const [editedCategory, seteditedCategory] = useState(null);

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
        const data = {name, parentCategory}
        if (editedCategory){
            data._id = editedCategory._id
            await axios.put('/api/categories', data)
            seteditedCategory(null)

        }
        else {
        await axios.post('/api/categories', data) 
        }

        setparentCategory('')
        setname('')
        fetchCategories();
    }

    function editCategory(category){
        seteditedCategory(category)
        setname(category.name)
        setparentCategory(category.parent?._id)

    
    }

    
    
    function deleteCategory(category){
        
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete ${category.name} category?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d44',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
          }).then(async ( result) => {
            if (result.isConfirmed) {
                const {_id} = category
                await axios.delete('/api/categories?_id='+_id, {_id})
                fetchCategories()
                Swal.fire(
                'Deleted!',
                `${category.name} Category has been deleted successfully`,
                'success'
              )
            }
          })
        
          
      
    }
    


    return(
        <Layout>
            <h1>Categories</h1>

            <label> {editedCategory ? `Edit Category ${editedCategory.name}` : "Create New Category"}</label>
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
                            <td><button className="btn-primary py-1 bg-blue-900 text-white mr-1" onClick={()=> editCategory(category)}>Edit</button>
                            <button className="btn-primary py-1 bg-red-800 text-white" onClick={()=> deleteCategory(category)}>Delete</button>
</td>
                        </tr>
                    ))}
                </tbody>   
            </table>
        </Layout>
    )
}

