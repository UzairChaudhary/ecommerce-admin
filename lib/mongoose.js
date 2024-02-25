import mongoose from "mongoose";

export const mongooseConnect = () => {
    
    if (mongoose.connection.readyState===1){
        return mongoose.connection.asPromise();
    }
    else{
        const uri = "mongodb+srv://admin:admin@e-commerce-web-app-clus.xasasys.mongodb.net/?retryWrites=true&w=majority";
        return mongoose.connect(uri);
    }
}