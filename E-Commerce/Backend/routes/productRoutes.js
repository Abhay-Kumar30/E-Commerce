import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController, deleteProductController, getMaximumPrice, getProductController, getSingleProductController, getproductPerPageController, gets, productCategoryController, productCountController, productFilterController, productListController, productPerPageController, productPhotoController, realtedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
import fomidable from 'express-formidable';

const router = express.Router();

// routes --by admin
router.post('/create-product', requireSignIn, isAdmin, fomidable(), createProductController);

// get all products
router.get('/get-product', getProductController);

// get single product
router.get('/get-product/:slug', getSingleProductController);

// get photo
router.get('/product-photo/:pid', productPhotoController);

// delete product
router.delete('/delete-product/:pid', deleteProductController);

// update product
// :pid it means "product-ID" -- by admin
router.put('/update-product/:pid', requireSignIn, isAdmin, fomidable(), updateProductController);


// search product
router.get('/search/:keyword', searchProductController);

// similar product
// pid  is product ID
// cid is category ID
router.get("/related-product/:pid/:cid",realtedProductController);

// set number of product per page  --admin
router.post('/product-per-page',requireSignIn, isAdmin, productPerPageController);

// get number of product per page  
router.get('/get-product-per-page', getproductPerPageController);

// get all product with or without filter 
router.get('/get-product-new/:PageNumber', gets);

// get maximum price of product
router.get('/maximum-price', getMaximumPrice);

export default router;