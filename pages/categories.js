import Layout from "@/components/layout";
import axios from "axios";
import {useState, useEffect} from 'react';
import Swal from 'sweetalert2'
export default function Categories(){
    
    const [name, setname] = useState('');
    const [categories, setcategories] = useState([]);
    const [parentCategory, setparentCategory] = useState('');
    const [Properties, setProperties] = useState([]);
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
        console.log(Properties)
        const data = {
            name,
            parentCategory,
            
            Properties:Properties.map(p => ({name:p.name , value:p.value.split(','),}))
        }
        //console.log(data)
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
        setProperties([])
        fetchCategories();
    }

    function editCategory(category){
        seteditedCategory(category)
        setname(category.name)
        setparentCategory(category.parent?._id)
        setProperties(category.Properties)
        console.log(category)

    
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
    
    function addProperty() {
        setProperties(prev => {
            return [...prev, {name: "", value: ""}]
        })
    }
    function removeProp (indexToRemove){
        setProperties(prev => {
            return [...prev].filter((prop, index) => {
                return index !== indexToRemove
            })
        })
        console.log(Properties)
        
    
    }
    return(
        <Layout>
            <h1>Categories</h1>

            <label> {editedCategory ? `Edit Category ${editedCategory.name}` : "Create New Category"}</label>
            <form onSubmit={saveCategory}>
                <div className="flex gap-1" >
                <input 
                 
                type="text" 
                placeholder={"Category Name"}
                onChange={(e)=> setname(e.target.value)}
                value={name}
                
                ></input>
                <select value={parentCategory} onChange={ev => setparentCategory(ev.target.value)}>
                    <option value="0">No Parent Category</option>
                    {categories.length > 0 && categories.map((category)=>(
                        
                            // eslint-disable-next-line react/jsx-key
                            <option value={category._id}>
                            {category.name}
                            </option>
                        
                    ))}
                </select>

                </div>

                <div className="mb-2">
                    
                <label className="block">Properties</label>
                <button type="button" className="  text-white btn-default text-sm mb-2" onClick={addProperty}>Add new property</button>
                {Properties.length >0 && Properties.map((prop,index) => (
                    // eslint-disable-next-line react/jsx-key
                    <div className="flex gap-1 mt-1 items-center">
                        <input type="text" className="h-7 my-1" placeholder="Property Name" value={prop.name} onChange={ev => {
                            // const newProps = [...Properties]
                            // newProps[index].name = ev.target.value
                            // setProperties(newProps)
                            setProperties(prev => {
                                return [...prev].map((prop, i) => {
                                    if (i === index) {
                                        return {
                                            ...prop,
                                            name: ev.target.value
                                        }
                                    }
                                    return prop
                                })
                            })
                           
                            
                        }}></input>
                        <input type="text" className="h-7 my-1" placeholder="Property Value" value={prop.value} onChange={ev => {
                            const newProps = [...Properties]
                            newProps[Properties.indexOf(prop)].value = ev.target.value
                            setProperties(newProps)
                        }}></input>
                        <button 
                          type="button" className=" text-white btn-default text-sm my-1"
                          onClick={()=>removeProp(index)}>Remove
                        </button> 

                    </div>

                    



                    )) }
                
                </div>

                <div className="flex gap-1">
                {editedCategory && (
                    <button
                    onClick={()=> {
                        seteditedCategory(null);
                        setname('');
                        setparentCategory('');
                        setProperties([])
                    }}
                    type="button" className="btn-primary bg-gray-600 text-white ">Cancel</button>
                )}

                <button type="submit" className="btn-primary py-1 bg-blue-900 text-white" >Save</button>


                </div>
                

            </form>

            {!editedCategory && (


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
                            <td><button className="btn-default py-1 bg-blue-900 text-white mr-1" onClick={()=> editCategory(category)}>Edit</button>
                            <button className="btn-default py-1 bg-red-800 text-white" onClick={()=> deleteCategory(category)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>   
            </table>


            )}

            
        </Layout>
    )
}

