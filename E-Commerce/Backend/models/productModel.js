import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:"Category",
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    
},{ timestamps:true}
);

export default mongoose.model('Products',productSchema);

// timestamps:true means whenever we create a product we get time of product created

// In Mongoose, the populate function is used to replace a specified path in a document
//  with the actual document(s) from another collection. It is often used when dealing with
//  references between documents in MongoDB.

// Mongoose will automatically populate the category field with the document from the "Category" model 
// that corresponds to the stored ObjectId: When you call populate on a document, Mongoose will automatically 
// replace the ObjectId in the category field with the corresponding document from the "Category" model. 
// It queries the "Category" collection using the stored ObjectId values, fetches the matching documents, 
// and replaces the references in the original document with the actual documents.

//note  .populate("category") // This will replace the ObjectId references with actual Category documents