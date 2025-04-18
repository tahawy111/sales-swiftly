import { Request, Response } from 'express';
import Product from '../models/Product';
import Category from '../models/Category';


export const getProducts = async (req: Request, res: Response) => {
  try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;

      const [products, totalCount] = await Promise.all([
          Product.find()
              .populate('category')
              .skip(skip)
              .limit(limit)
              .sort({ name: 1 }),
          Product.countDocuments()
      ]);

      const totalPages = Math.ceil(totalCount / limit);

      res.render('products/index', {
          products,
          currentPage: page,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
          error: null
      });
  } catch (error) {
      console.error('Products Error:', error);
      res.render('products/index', {
          products: [],
          currentPage: 1,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
          error: 'Failed to load products'
      });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().sort({ name: 1 });
    res.render('products/index', { products, error: null });
  } catch (error) {
    res.render('products/index', { products: [], error: 'Failed to fetch products' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    await Product.create(req.body);
    res.redirect('/products');
  } catch (error) {
    res.render('products/new', { error: 'Failed to create product' });
  }
};

export const getEditProduct = async (req: Request, res: Response) => {
    try {
        const [product, categories] = await Promise.all([
            Product.findById(req.params.id).populate('category'),
            Category.find().sort({ name: 1 })
        ]);

        if (!product) {
            return res.redirect('/products');
        }

        res.render('products/edit', { 
            product, 
            categories,
            error: null 
        });
    } catch (error) {
        res.render('products/edit', { 
            product: null, 
            categories: [],
            error: 'Failed to load product' 
        });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/products');
  } catch (error) {
    res.render('products/edit', { error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (error) {
    res.redirect('/products');
  }
};

export const productController = {
    index: async (req: Request, res: Response) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = 10;
            const skip = (page - 1) * limit;

            const [products, totalCount] = await Promise.all([
                Product.find()
                    .populate('category')
                    .skip(skip)
                    .limit(limit)
                    .sort({ name: 1 }),
                Product.countDocuments()
            ]);

            const totalPages = Math.ceil(totalCount / limit);

            res.render('products/index', {
                products,
                currentPage: page,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            });
        } catch (error) {
            res.render('products/index', {
                error: 'Failed to load products',
                products: [],
                currentPage: 1,
                totalPages: 1,
                hasNextPage: false,
                hasPrevPage: false
            });
        }
    },
    // Update the create/edit methods to include categories
    create: async (req: Request, res: Response) => {
        try {
            const categories = await Category.find().sort({ name: 1 });
            res.render('products/new', { categories });
        } catch (error) {
            res.render('products/new', { error: 'Failed to load categories' });
        }
    },

    edit: async (req: Request, res: Response) => {
        try {
            const [product, categories] = await Promise.all([
                Product.findById(req.params.id),
                Category.find().sort({ name: 1 })
            ]);
            if (!product) throw new Error('Product not found');
            res.render('products/edit', { product, categories });
        } catch (error) {
            res.redirect('/products');
        }
    }
};

