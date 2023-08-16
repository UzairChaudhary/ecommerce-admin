import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/router";
import {Button, Card, Image, List, message, Progress} from 'antd'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import Spinner from '@/components/spinner'
import {ReactSortable} from 'react-sortablejs'
export default function ProductForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice,
    images:existingImages
}){

    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    //const [goToProducts, setGoToProducts] = useState(false);
    const [images, setImages] = useState(existingImages || []);
    // const [downloadURL, setDownloadURL] = useState('');
    // const [imagefile, setImageFile] = useState();
    // const [progressUpload, setProgressUpload] = useState();
    const [isUploading, setisUploading] = useState(false);
    const router = useRouter()
    const imageLinks=[]
        const saveProduct = async (ev) => {
            ev.preventDefault();
            const data = {title,description,price,images}
            console.log(data)
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

    // const uploadImage = (ev) =>{
        
    //     const file = ev.target?.files
    //     if(file && file[0].size < 10000000){
            
    //         setImageFile(file[0])
    //         console.log(file[0])
    //     }
        
    // }

    const handleUploadFile = (ev) => {
        ev.preventDefault()
        const file = ev.target?.files
        
        if (file[0]){

            setisUploading(true)
            console.log(file[0])
            const name = file[0].name
           // const storage = getStorage();
            const storageRef = ref(storage, `images/${name}`);

            const uploadTask = uploadBytesResumable(storageRef, file[0]);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                //setProgressUpload(progress)
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                // Handle unsuccessful uploads
                message.error(error)
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
                console.log('File available at', URL);
               // setDownloadURL(URL)
                imageLinks.push(URL)
                setImages(oldimages => {
                    return([...oldimages,URL])

                })
                setisUploading(false)
                });
            }
            );
            }
            else{
                message.error('File not found')
            }
            
            
    }  
//  const handleRemoveFile = () => {
//     setImageFile(null)

//  }


    
    return(
        
            <form>
            
            <label>Product Name</label>
            <input type="text" placeholder="product name" value={title} onChange={ev => setTitle(ev.target.value)}/>
            <label>Photos</label>
            <div className="mb-2 flex flex-wrap gap-1 ">

                <ReactSortable 

                list={images} 
                setList={setImages} 
                className="flex flex-wrap gap-1">

                {!!images?.length && images.map(links=>(
                    <div key={links} className="h-24 ">
                        <img src={links} alt={links} className="rounded-lg"></img>

                    </div>
                ))}
                </ReactSortable>
                {
                    isUploading && (
                        <div className="h-24 flex items-center">
                            <Spinner />
                        </div>
                    )
                }
                

                <label className=" cursor-pointer w-24 h-24 bg-gray-200 text-gray-500 flex p-4 items-center justify-center text-sm gap-1 rounded-lg">
                    
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>

                <span className="">Upload</span>
                <input type="file" className="hidden" onChange={(e)=>handleUploadFile(e)} ></input>
                    
                </label>
                
            </div>

            {/* <div className="mt-5">
                <Card >
                    {imagefile && (
                        <>
                    <List.Item 
                        extra={[
                            // eslint-disable-next-line react/jsx-key
                            <Button type="text" onClick={handleRemoveFile} className="rounded-lg" >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>

                            </Button>

                    ]}>
                        
                            <List.Item.Meta
                            title={imagefile.name}
                            >

                            </List.Item.Meta>
                        

                    </List.Item>

                    <div className="text-right mt-3">
                        
                        <button type="primary" className="bg-blue-900 text-white hover:bg-blue-900" onClick={e=>handleUploadFile(e)} >Upload</button>
                        <Progress percent={progressUpload} />
                    </div>

                    </>
                    )}

                    {downloadURL && (
                        <>  
                            <Image src={downloadURL} alt={downloadURL}
                            style={{width:100, height:100, objectFit:'cover'}} />
                            
                        </>
                    )}
                    
                </Card>
            </div> */}
            
            
            
            <label>Product Description</label>
            <textarea placeholder="Description" value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
            <label>Product Price</label>
            <input placeholder="price" type="text" value={price} onChange={ev => setPrice(ev.target.value)} />
            <button className="btn-primary"  onClick={(e)=> saveProduct(e)}>Save</button>

            </form>
        
    )
  
}
