import { Router } from 'express';
import {
  getDashboard,
  getSalesReport,
  getInventoryReport
} from '../controllers/dashboardController';

const router = Router();

router.get('/', getDashboard);
router.get('/sales', getSalesReport);
router.get('/inventory', getInventoryReport);

export default router;