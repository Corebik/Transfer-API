import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { IUser } from '../models/Auth';

declare global {
   namespace Express {
      interface Request {
         user?: IUser;
      }
   }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
   const bearer = req.headers.authorization;

   if (!bearer) {
      const error = new Error('Not authorized');
      res.status(401).json({ ok: false, msg: error.message });
      return;
   }

   try {
      const [, token] = bearer.split(' ');
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

      const user = await User.findById(decoded.id).select('_id name email');

      if (user) {
         req.user = user;
         next();
      } else {
         res.status(500).json({
            ok: false,
            msg: 'Not valid token',
         });
      }
   } catch (error) {
      res.status(500).json({
         ok: false,
         msg: 'Not valid token',
      });
   }
};
