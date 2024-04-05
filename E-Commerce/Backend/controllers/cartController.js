import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

// add product in the cart
export const cartProductController= async(req,res)=>{
    try{   
          // first we check is the 'buyerID' present in cartModel(i.e we check is this 'buyerID' added any product in cart)
          // if the 'buyerID 'is present in cartModel then we push(or insert) the productID in "products" property of his cart
          // if 'buyerID' is not present then we create a new cart for him and add 'buyerID' and 'productID' in corresponding propertices of his cart 
         const { productID, buyerID } = req.params;

          // Find the cart that matches the conditions
         const cart = await cartModel.findOne({ buyer: buyerID });
       
         if (cart) {

            // if "cart" exist then push the productID into the products array
          cart.products.push(productID);
           // Save the updated cart
          await cart.save();
         } else {
           
            // if "cart" not exist(i.e user have not added any product in cart yet) then:-
           // create a new cart with the provided buyerID and productID                  
          await cartModel.create({ products: [productID], buyer: buyerID });

        }
        res.status(200).send({
            success: true,
            message: "Product is added in the cart Successfully",           
            })
       
    }catch(error){
        
        res.status(500).send({
            success:false,
            error: error,
            message:"Error, To add the product in the cart"
        });
     }
}



// remove product from the cart
export const deleteCartProductController = async (req, res) => {
    try  {
           const { productID, buyerID } = req.params;
  
           // Find the cart that matches the buyerID
           const cart = await cartModel.findOne({ buyer: buyerID });
  
           // if we get cart(i.e user have already added some product in cart ) then we findex of product( in products array) which have to be delete
           
           const productIndex = cart?.products.indexOf(productID);
           cart?.products.splice(productIndex, 1);
           await cart?.save();
   // check the "products" array is empty or not
           // if "products" array is empty then we delete the cart for this specific buyerID from cart model
  
           // fetch the cart of buyerID 
           // if in this cart "product" array is empty then delete this specific cart
           // there is no mean to keep the empty cart in the database
           const againFetchcart = await cartModel.findOne({ buyer: buyerID });
           if(againFetchcart?.products.length === 0){
               await cartModel.deleteOne({ buyer: buyerID })
              }
           res.status(200).send({
               success: true,
               message: "Product deleted",
             });
             
          } catch (error) {
      
                res.status(500).send({
                  success: false,
                  error: error,
                  message: "Error removing the product from the cart",
                });
              }
      };


      // get all cart products
      export const getAllCartProductController = async (req, res) => {
        try {
          const allCartProduct = await cartModel.find();
          const cart = [];
          
      
          await Promise.all(
            allCartProduct.map(async (e) => {
              const statusofCart=e.status;
             
              const specificBuyer = await userModel.findById(e.buyer).select("-password");
              const allProduct = await Promise.all(
                e.products.map(async (eachProduct) => {
                  return await productModel.findById(eachProduct).select("-photo");
                })
              );
      
              const cartoon = {
                products: allProduct,
                user: specificBuyer,
                status:statusofCart,
              };
              cart.push(cartoon);
            })
          );
      
    
          res.status(200).send({
            success: true,
            allCartProduct: allCartProduct,
            cart: cart,
            message: "Products fetched from carts Successfully",
          });
        } catch (error) {
          res.status(500).send({
            success: false,
            error: error,
            message: "Error fetching products from carts",
          });
        }
      };
      

      // change cart product status
      export const changeStatusOfCartProductController =async(req,res)=>{
        try{
               const { buyerID } = req.params; 
               const {status}=req.body;
     
               // find the cart which the buyer have ID equal to buyerID 
               const x= await cartModel.findOne({buyer:buyerID});

               // fetch the ID of cart inwhich above buyer is present
               const objectID = x._id;

               // find the above cart and update the status of this cart
               await cartModel.findByIdAndUpdate(objectID,{status:status}, {new: true})
         
          res.status(200).send({
            success: true,
            message: "status updated",
          });

        }catch(error){
        
            res.status(500).send({
                success:false,
                error: error,
                message:"Error, To change status of product from cart"
            });
         }
      }


      // get cart of specific person
      export const getSingleCartProductController =async(req,res)=>{
        try {
               const {buyerID}=req.params;
               const x = await cartModel.findOne({buyer:buyerID});          
               

                if (x && x.products && x.products.length > 0) {
                 const productPromises = x.products.map(async (e) => {
                    const y = await productModel.findById(e).select("-photo");
                    return y;
                  });
        
            const products = await Promise.all(productPromises);
            const wholeCart={
              products:products,
              status:x.status,
            }
            
           
          res.status(200).send({
            success: true,
            wholeCart:wholeCart,
            message: "Products fetched from carts Successfully",
          })}
        } catch (error) {
          res.status(500).send({
            success: false,
            error: error,
            message: "Error fetching cart",
          });
        }
      }



     