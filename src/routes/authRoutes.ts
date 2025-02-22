import { Router } from 'express';
import { check } from 'express-validator';
//Controller
import { AuthController } from '../controllers/AuthController';
//Middlewares
import { authenticate } from '../middlewares';
import { handleInputErrors } from '../middlewares/transferErrors';

const router = Router();

router.post(
   '/create-user',
   [
      check('email', 'Not valid email').isEmail(),
      check('name', 'The name is required').not().isEmpty(),
      check('password', 'The password is must be at least 8 characters').isLength({ min: 8 }),
      check('confirmPassword', 'The password is must be at least 8 characters').custom(
         (value, { req }) => {
            if (value !== req.body.password) {
               throw new Error('Passwords do not match');
            }

            return true;
         },
      ),
      handleInputErrors,
   ],
   //*Controller
   AuthController.createUser,
);

router.post(
   '/login',
   [
      check('email', 'Not valid email').isEmail(),
      check('password', 'The password is required').not().isEmpty(),
      handleInputErrors,
   ],
   AuthController.login,
);

router.get('/user', [authenticate], AuthController.getUser);

export default router;
