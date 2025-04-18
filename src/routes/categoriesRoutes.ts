import express from 'express';
import { categoryController } from '../controllers/categoryController';
import { isAuthenticated } from '../middleware/auth';

const router = express.Router();

router.use(isAuthenticated);

router.get('/', categoryController.index);
router.get('/new', categoryController.create);
router.post('/', categoryController.store);
router.get('/:id/edit', categoryController.edit);
router.post('/:id', categoryController.update);
router.post('/:id/delete', categoryController.delete);

export default router;