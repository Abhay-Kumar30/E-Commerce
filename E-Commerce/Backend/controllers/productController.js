import slugify from "slugify";
import categoryModel from "../models/categoryModel.js"
import productModel from "../models/productModel.js";
import fs from 'fs';
import userModel from "../models/userModel.js";


// vcreate a product
export const createProductController= async(req,res)=>{
    try{

     
        const {name,description,price,category,quantity}=req.fields;
        const {photo}=req.files;

       
        // validations
        switch(true){
                case !name:
                return res.status(500).send({ error:"Name is Required"});

                case !description:
                return res.status(500).send({ error:"description is Required"});

                case !price:
                return res.status(500).send({ error:"price is Required"});

                case !category:
                return res.status(500).send({ error:"category is Required"});

                case !quantity:
                return res.status(500).send({ error:"quantity is Required"});

                // size of photo maximum 1mb
                // one megabyte is equal to one million bytes of data.
                case photo && photo.size>1000000:
                return res.status(500).send({ error:"photo is required and it should be less then 1mb"});
        }

        const products = new productModel({...req.fields, slug:slugify(name)});
if(photo){
    products.photo.data = fs.readFileSync(photo.path);
    products.photo.contentType = photo.type;
}
await products.save();
res.status(201).send({
    success: true,
    message: "Product Created Successfully",
    products: products,
})

    }catch(error){
       
        res.status(500).send({
            success:false,
            error,
            message:"Error in creating product"
        });
     }
}


// get all products
export const getProductController = async (req,res)=>{
    try{

// .select("-photo") means we remove the "photo" property
// .limit(12) it means we fetch only 12 products only
// .sort({createdAt:-1}) it means we sort the fetched products
// .populate("category") it means we get all information about each products


        const products=await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            countTotal: products?.length,
            message:" All products in offer",
            products: products,
           
        })

    }catch(error){
       
        res.status(500).send({
            success:false,
            message:"Error in getting products",
            error:error.message
        })
    }
}

// get single product 
export const getSingleProductController = async (req,res)=>{
    try{

        const product = await productModel.findOne({slug: req.params.slug}).select("-photo").populate("category");

        res.status(200).send({
            success:true,
            message: "Single Product Fetched",
            product:product,
        })

    }catch(error){
       
        res.status(500).send({
            success:false,
            message:"Error in getting single products",
            error:error,
        })
    }
}

// get photo
export const productPhotoController = async(req,res)=>{
    try{

        // .select("photo") it means we fetch only photo
        const product = await productModel.findById(req.params.pid).select("photo");
        if(product?.photo.data){
            res.set('Content-type', product?.photo.contentType);
            return res.status(200).send(product?.photo.data);

        }


    }catch(error){
        
        res.status(500).send({
            success:false,
            message:"Error in getting photo",
            error:error,
        })
    }
}


// delete product 
export const deleteProductController = async(req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success:true,
            message:"Product Deleted Successfully"
        })

    }catch(error){
        
        res.status(500).send({
            success:false,
            message:"Error in deleting product",
            error:error,
        })
    }
}

// update product
export const updateProductController = async (req,res)=>{
    try{

        const {name,slug,description,price,category,quantity,shipping}=req.fields;
        const {photo}=req.files;

       
        // validations
        switch(true){
                case !name:
                return res.status(500).send({ error:"Name is Required"});

                case !description:
                return res.status(500).send({ error:"description is Required"});

                case !price:
                return res.status(500).send({ error:"price is Required"});

                case !category:
                return res.status(500).send({ error:"category is Required"});

                case !quantity:
                return res.status(500).send({ error:"quantity is Required"});

                case photo && photo.size>1000000:
                return res.status(500).send({ error:"photo is required and it should be less then 1mb"});
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid, {...req.fields, slug:slugify(name)}, {new: true});
if(photo){
    products.photo.data = fs.readFileSync(photo.path);
    products.photo.contentType = photo.type;
}
await products.save();
res.status(201).send({
    success: true,
    message: "Product updated Successfully",
    products: products,
})




    }catch(error){
        
        res.status(500).send({
            success:false,
            message:"Error in Update product",
            error:error,
        })
    }
}


// filters
export const productFilterController = async(req,res)=>{
    try{
        const { checked, radio }=req.body;
        
        let args = {};

        // we cancheck multiple value this is why "checked" behave as array
        // "radio" is behave as single value because we can select single radio only
        if( checked.length>0){ args.category = checked ;}
        if( radio.length){ args.price = {$gte: radio[0], $lte: radio[1] } };
        const products = await productModel.find(args);
        res.status(200).send({
            success:true,
            products: products,
        })


    }catch(error){
        
        res.status(500).send({
            success:false,
            message:"Error in Update product",
            error:error,
        })
    }

}


// product count
export const productCountController =async(req,res)=>{
    try{
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success:true,
            total: total,
        })

    }catch(error){
       
        res.status(400).send({
            success:false,
            message:"Error in product count",
            error:error,
        })
    }
}

     //get product list base on page
     export const productListController =async(req,res)=>{
        try{
            // we show 6 pages per page
            const perPage = 6;
            const page = req.params.page ? req.params.page : 1
            const products = await productModel.find({}).select("-photo").skip((page-1)*perPage).limit(perPage).sort({createdAt:-1});
            res.status(200).send({
                success:true,
                products,
            })


        }catch(error){
           
            res.status(400).send({
            success:false,
            message:"eror in per page controller",
            error:error,
        })
        }
     }

     // search product
     // we seacrch the product on the basis of keyword we search for is found in name and discription of product
     // $options: "i" means case insensetive
     // .select("-photo") means we remove the photo from selected product
     export const searchProductController = async(req,res)=>{
        try{
            const { keyword } = req.params;
            const resutls = await productModel.find({ $or: [ { name: { $regex: keyword, $options: "i" } }, { description: { $regex: keyword, $options: "i" } }, ], }).select("-photo");
            res.json(resutls);

        }catch(error){
           
            res.status(400).send({
            success:false,
            message:"eror in per page controller",
            error:error,
        })
        }

     }


     // similar products
export const realtedProductController = async (req, res) => {
    try {
      const { pid, cid } = req.params;

      // _id: { $ne: pid } it means we dont show the product ( on which we have clicked ) in similar product section
      // ne means not enclude
      // .limit(3) we show only three products in the similar section
      const products = await productModel.find({ category: cid, _id: { $ne: pid },}).select("-photo").limit(3).populate("category");
      res.status(200).send({
        success:  true,
        products: products,
      });
    } catch (error) {
     
      res.status(400).send({
        success: false,
        message: "error while geting related product",
        error:error,
      });
    }
  };
  
  // get prdocyst by catgory
  export const productCategoryController = async (req, res) => {
    try {
      const category = await categoryModel.findOne({ slug: req.params.slug });
      const products = await productModel.find({ category }).populate("category");
      res.status(200).send({
        success: true,
        category:category,
        products:products,
      });
    } catch (error) {
      
      res.status(400).send({
        success: false,
        error: error,
        message: "Error While Getting products",
      });
    }
  };


  // set number of  product to show by admin
  export const productPerPageController = async(req,res)=>{
    try{

        const {numberOfProduct} =req.body;
       
        // get all admins
        const AllAdmins = await userModel.find({role:1});

        // update the numberOfProduct property in each admins in database
        AllAdmins.map(async(e,next)=>{
           
            await userModel.findByIdAndUpdate({_id:e._id},{productsPerPage:numberOfProduct});
            
        });
          
        

    res.status(200).send({
        success:  true,
        message:"Successfully set product per page ",
      });
    } catch (error) {
     
      res.status(400).send({
        success: false,
        message: "error while setting no. of  product",
        error:error,
      });
    }
  };

  // get product per page
  export const getproductPerPageController =async(req,res)=>{
    try{
        const admin =await userModel.findOne({role:1});
        const productPerPage = admin?.productsPerPage;
       

     res.status(200).send({
        success:  true,
        productPerPage:productPerPage,
        message:"Successfully fetched",
      });
    } catch (error) {
     
      res.status(400).send({
        success: false,
        message: "Error while getting no. of  product",
        error:error,
      });
    }
  }

// get all products with or without filter
export const gets =async(req,res)=>{
    
    try {
        const {PageNumber}=req.params;
        const {AllCategories, FilterCategories,FilterPrice, numberOfProductsPerPage  } = req.query;
      
        let categoryIds = FilterCategories || AllCategories;
        
        const minPrice = FilterPrice && FilterPrice[0] ? FilterPrice[0] : 0;
        const maxPrice = FilterPrice && FilterPrice[1] ? FilterPrice[1] : Number.MAX_SAFE_INTEGER;
        const page = PageNumber || 1;
        const pageSize = numberOfProductsPerPage || 10; // Default page size is 10, adjust as needed

    
        let args = {};
        if( categoryIds.length>0){ args.category = categoryIds ;}
        if( FilterPrice.length){ args.price = {$gte: minPrice, $lte: maxPrice } };
        const productsLength = await productModel.find(args).select("-photo");
 
        const totalPages = Math.ceil(productsLength.length / pageSize); // Calculate total pages needed for pagination
        const NumberofProductsSkip= (page-1)*pageSize;     
        const products = await productModel.find(args).select("-photo").skip(NumberofProductsSkip).limit(pageSize);

    
        res.status(200).send({
          success: true,
          message: "Products fetched successfully",
          products: products,
          totalNumberOfProducts: productsLength.length,
          totalPages: totalPages 
        });
      } catch (error) {
        res.status(400).send({
          success: false,
          message: "Error while getting product",
          error: error,
        });
      }}


      // get maximum price 
      export const getMaximumPrice =async (req,res) => {
        try{

            const price = await productModel.find({},{price:1});

            let allTypeOfPrices;
            if(price.length !==0){
              //
               allTypeOfPrices= price.map((e)=>{
                return e.price;
            })
            }else{
              res.status(400).send({
                success: false,
                message: "No product exist",
                
              });
            }
          
            // find maximum price
           let maximumPrice = Math.max(...allTypeOfPrices);
            
            res.status(200).send({
                success: true,
                message: "Products fetched successfully",
                maximumPrice: maximumPrice,})
        }catch (error) {
        res.status(400).send({
          success: false,
          message: "Error while getting product",
          error: error,
        });
      }
      }

   