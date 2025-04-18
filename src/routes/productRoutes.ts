import { Router } from 'express';
import { isAdmin } from '../middleware/auth';
import Category from '../models/Category';
import {
  getAllProducts,
  createProduct,
  getEditProduct,
  updateProduct,
  deleteProduct,
  getProducts
} from '../controllers/productController';

const router = Router();

router.get('/', getProducts); // Main products page with pagination
router.get('/all', getAllProducts); // Get all products (for API/select purposes)
// Update the new product route to fetch categories
router.get('/new', isAdmin, async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.render('products/new', { categories, error: null });
    } catch (error) {
        res.render('products/new', { categories: [], error: 'Failed to load categories' });
    }
});
router.post('/', isAdmin, createProduct);
router.get('/:id/edit', isAdmin, getEditProduct);
router.post('/:id', isAdmin, updateProduct);
router.post('/:id/delete', isAdmin, deleteProduct);

export default router;