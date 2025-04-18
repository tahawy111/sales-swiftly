import { Router } from 'express';
import { isAuthenticated } from '../middleware/auth';

const router = Router();

// Define routes for New Sale and Sales History
router.get('/new', isAuthenticated, (req, res) => {
  res.render('sales/new');
});

router.get('/history', isAuthenticated, (req, res) => {
  res.render('sales/history');
});

export default router;