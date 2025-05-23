import { Router } from 'express';
import authRoutes from './authRoutes';
import productRoutes from './productRoutes';
import dashboardRoutes from './dashboardRoutes';
import categoriesRoutes from './categoriesRoutes';
import salesRoutes from './salesRoutes';
import { isAuthenticated } from '../middleware/auth';

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', isAuthenticated, productRoutes);
router.use('/dashboard', isAuthenticated, dashboardRoutes);
router.use('/categories', isAuthenticated, categoriesRoutes);
router.use('/sales', isAuthenticated, salesRoutes);

router.get('/', (req, res) => {
  res.redirect('/dashboard');
});

export default router;