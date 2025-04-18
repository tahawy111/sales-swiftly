import 'express-session';
import { Types } from 'mongoose';
import { UserDocument } from '../models/User'; // Assuming UserDocument is the type for a user instance

declare module 'express-session' {
  interface SessionData {
    user?: UserDocument;
    userRole?: string;
  }
}