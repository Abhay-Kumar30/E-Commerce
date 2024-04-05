import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res)=>{
    try{
        const {name}=req.body
        if(!name){
            return res.status(401).send({message:"name is required"})
        }
        // there shouldn't be two category of same "name"
        // get the product of category of above name
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            // if product of category 'name' written above is already exist then
            return res.status(200).send({
                success:true,
                message:"category already exist"
            })
        }
        const category = await new categoryModel({name:name, slug:slugify(name)}).save();
        // if we give the category name like "fruit basket" the slugify will conver it to "fruit-basket"
        // by default slugify replace the space by hyphen(-)
        // we can replace the space by somethis else as we want with the help of "slugify"


        res.status(201).send({
            success:true,
            message:"new category created",
            category,
           
        });
    }catch(error){
       
        res.status(500).send({
            success:false,
            error,
            message:"Error in category"
        });
     }
   }

   // update category 
   export const updateCategoryController = async (req, res)=>{
    try{

        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(
            id,
            {name, slug: slugify(name)},
            {new:true}
        );
        // {new:true} must be provide otherwise our category will not get update

        res.status(200).send({
            success:true,
            message:"Category Update Successfully",
            category: category,
        });

    }catch(error){
       
        res.status(500).send({
            success:false,
            error,
            message:"Error in updating category"
        });
     }
   }


   // get all category
   export const categoryController= async (req,res)=>{
    try{

        const category = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:"All Category List",
            category: category,
        })
    }catch(error){
      
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting all categories"
        });
     }
   }

   // get single category
   export const singleCategoryController =async (req,res)=>{
    try{
        const category = await categoryModel.findOne({slug: req.params.slug});

        res.status(200).send({
            success:true,
            message:"Get single category successfully",
            category,
        })



    }catch(error){
  
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting single categories"
        });
     }

   }


   // delete category 
   export const deleteCategoryController = async (req,res)=>{
try{

    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
        success:true,
        message:"Category deleted successfully",
    })
}catch(error){
     
        res.status(500).send({
            success:false,
            error,
            message:"Error while delete categories"
        });
     }

   }