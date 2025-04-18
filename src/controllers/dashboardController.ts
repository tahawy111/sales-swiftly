import { Request, Response } from 'express';
import Product from '../models/Product';
import Category from '../models/Category';
import Sale from '../models/Sale';

export const getDashboard = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = 5; // Smaller limit for dashboard
        const skip = (page - 1) * limit;

        // Get today's date range
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Fetch all required data
        const [
            todaySales,
            totalProducts,
            totalCategories,
            lowStockProducts,
            recentSales,
            totalLowStock,
            totalSales
        ] = await Promise.all([
            Sale.aggregate([
                { $match: { createdAt: { $gte: today, $lt: tomorrow } } },
                { $group: { _id: null, total: { $sum: '$total' } } }
            ]),
            Product.countDocuments(),
            Category.countDocuments(),
            Product.find({ stock: { $lte: 'minStock' } })
                .populate('category')
                .limit(5)
                .sort({ stock: 1 }),
            Sale.find()
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            Product.countDocuments({ stock: { $lte: 'minStock' } }),
            Sale.countDocuments()
        ]);

        const totalPages = Math.ceil(totalSales / limit);

        res.render('dashboard/index', {
            todaySales: todaySales[0]?.total || 0,
            totalProducts,
            totalCategories,
            lowStockCount: await Product.countDocuments({ stock: { $lte: 'minStock' } }),
            lowStockProducts,
            recentSales,
            currentPage: page,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        });
    } catch (error) {
        res.render('dashboard/index', {
            error: 'Failed to load dashboard data',
            todaySales: 0,
            totalProducts: 0,
            totalCategories: 0,
            lowStockCount: 0,
            lowStockProducts: [],
            recentSales: []
        });
    }
};

export const getSalesReport = async (req: Request, res: Response) => {
    try {
        // Implement sales report logic
        res.render('dashboard/sales');
    } catch (error) {
        res.render('dashboard/sales', { error: 'Failed to load sales report' });
    }
};

export const getInventoryReport = async (req: Request, res: Response) => {
    try {
        // Implement inventory report logic
        res.render('dashboard/inventory');
    } catch (error) {
        res.render('dashboard/inventory', { error: 'Failed to load inventory report' });
    }
};