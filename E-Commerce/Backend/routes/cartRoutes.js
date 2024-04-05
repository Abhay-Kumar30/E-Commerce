import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
 import { cartProductController, changeStatusOfCartProductController, deleteCartProductController, getAllCartProductController, getSingleCartProductController } from '../controllers/cartController.js';

const router = express.Router();

// store product in cart of users
// pid is product id
// bid is id of buyer
 router.post('/cart-product/:productID/:buyerID', requireSignIn, cartProductController);

 // remove product from the cart
 router.delete('/delete-cart-product/:productID/:buyerID', requireSignIn, deleteCartProductController);

 // get all product from cart by admn
 router.get('/all-cart-product', requireSignIn, isAdmin, getAllCartProductController);;

 // chamge cart product status (not-processng, shipping etc)
 router.put('/change-cart-status/:buyerID', requireSignIn,isAdmin, changeStatusOfCartProductController);;

 // get single cart from cart by specific user
 router.get('/single-cart-product/:buyerID', requireSignIn, getSingleCartProductController);;


export default router;

