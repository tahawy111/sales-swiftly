import { Request, Response, NextFunction } from 'express';

export const addLocals = (req: Request, res: Response, next: NextFunction) => {
    res.locals.userId = req.session?.userId || null;
    res.locals.userRole = req.session?.userRole || null;
    res.locals.path = req.path;
    next();
};

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.session?.userId) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.session?.userRole === 'admin') {
        next();
    } else {
        res.redirect('/dashboard');
    }
};