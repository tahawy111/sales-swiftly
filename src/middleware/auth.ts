import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const addLocals = (req: Request, res: Response, next: NextFunction) => {
    res.locals.userId = req.session?.user?._id || null;
    res.locals.userRole = req.session?.userRole || null;
    res.locals.user = req.session?.user || null;
    res.locals.path = req.path;
    next();
};

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session?.user?._id) {
        try {
            const user = await User.findById(req.session.user._id);
            
            if (!user) {
                return res.redirect('/auth/login');
            }
            req.session.user = { _id: user._id, role: user.role }; // Update session with fresh data
            next();
        } catch (error) {
            console.error('Error fetching user:', error);
            res.redirect('/auth/login');
        }
    } else {
        res.redirect('/auth/login');
    }
    console.log("isAuthenticated");
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.session?.userRole === 'admin') {
        next();
    } else {
        res.redirect('/dashboard');
    }
};