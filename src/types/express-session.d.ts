import 'express-session';
import { Types } from 'mongoose';

declare module 'express-session' {
  interface SessionData {
    userId: Types.ObjectId | undefined | unknown;
    userRole: 'admin' | 'cashier';
  }
}