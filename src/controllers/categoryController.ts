import { Request, Response } from 'express';
import Category from '../models/Category';

export const categoryController = {
    index: async (req: Request, res: Response) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = 10;
            const skip = (page - 1) * limit;

            const [categories, totalCount] = await Promise.all([
                Category.find()
                    .skip(skip)
                    .limit(limit)
                    .sort({ name: 1 }),
                Category.countDocuments()
            ]);

            const totalPages = Math.ceil(totalCount / limit);

            res.render('categories/index', {
                categories,
                currentPage: page,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            });
        } catch (error) {
            res.render('categories/index', {
                error: 'Failed to load categories',
                categories: [],
                currentPage: 1,
                totalPages: 1,
                hasNextPage: false,
                hasPrevPage: false
            });
        }
    },

    // Show create form
    create: (req: Request, res: Response) => {
        res.render('categories/new');
    },

    // Store new category
    store: async (req: Request, res: Response) => {
        try {
            const { name, description } = req.body;
            await Category.create({ name, description });
            res.redirect('/categories');
        } catch (error) {
            res.render('categories/new', { 
                error: 'Failed to create category',
                category: req.body 
            });
        }
    },

    // Show edit form
    edit: async (req: Request, res: Response) => {
        try {
            const category = await Category.findById(req.params.id);
            if (!category) throw new Error('Category not found');
            res.render('categories/edit', { category });
        } catch (error) {
            res.redirect('/categories');
        }
    },

    // Update category
    update: async (req: Request, res: Response) => {
        try {
            const { name, description } = req.body;
            await Category.findByIdAndUpdate(req.params.id, { name, description });
            res.redirect('/categories');
        } catch (error) {
            res.render('categories/edit', {
                error: 'Failed to update category',
                category: { ...req.body, _id: req.params.id }
            });
        }
    },

    // Delete category
    delete: async (req: Request, res: Response) => {
        try {
            await Category.findByIdAndDelete(req.params.id);
            res.redirect('/categories');
        } catch (error) {
            res.redirect('/categories');
        }
    }
};