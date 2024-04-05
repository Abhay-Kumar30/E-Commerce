import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router();

// routes

// create category    -- by admin
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

// update category    -- by admin
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);


// get All  category
router.get('/get-category', categoryController);

// get single  category
router.get('/single-category/:slug', singleCategoryController);

// delete category  -- by admin
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);











export default router;


