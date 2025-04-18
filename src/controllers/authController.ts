import { Request, Response } from 'express';
import User from '../models/User';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.render('auth/login', { error: 'Invalid credentials' });
    }

    req.session.userId = user._id;
    req.session.userRole = user.role;
    res.redirect('/dashboard');
  } catch (error) {
    res.render('auth/login', { error: 'An error occurred' });
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
};