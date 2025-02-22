import type { Request, Response } from 'express';
import User from '../models/Auth';

//Utils
import { checkPassword, generateJWT, hashPassword } from '../utils';

export class AuthController {
   static createUser = async (req: Request, res: Response) => {
      try {
         const { email, password } = req.body;

         //Prevent duplicated emails
         const userExists = await User.findOne({ email });
         if (userExists) {
            res.status(400).json({
               ok: false,
               msg: 'User already exists',
            });
            return;
         }

         //Create user
         const user = new User(req.body);

         //HASH Password
         user.password = await hashPassword(password);

         await user.save();

         res.status(201).json({
            ok: true,
            msg: 'User created successfully',
         });
      } catch (error) {
         res.status(500).json({
            ok: false,
            msg: 'Error creating user',
         });
      }
   };

   static login = async (req: Request, res: Response) => {
      try {
         const { email, password } = req.body;
         const user = await User.findOne({ email });

         if (!user) {
            const error = new Error('User not found');
            res.status(404).json({ ok: false, msg: error.message });
            return;
         }

         // Verify password
         const validPassword = await checkPassword(password, user.password);
         if (!validPassword) {
            const error = new Error('Password incorrect');
            res.status(401).json({ ok: false, msg: error.message });
            return;
         }

         const token = generateJWT({ id: user.id });

         res.status(200).json({
            ok: true,
            token,
         });
      } catch (error) {
         res.status(500).json({ ok: false, msg: "There's an error" });
      }
   };

   static getUser = async (req: Request, res: Response) => {
      res.status(200).json(req.user);
      return;
   };
}
