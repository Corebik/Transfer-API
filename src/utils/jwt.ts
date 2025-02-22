import jwt from 'jsonwebtoken';
import Types from 'mongoose';

type userPayload = {
   id: Types.ObjectId;
};

export const generateJWT = (payload: userPayload) => {
   // const data = {
   //    id: user,
   //    credit_card: '1234567890123456',
   //    password: 'password',
   // };
   const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
   });

   return token;
};
