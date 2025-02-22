import moogose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
   email: string;
   password: string;
   name: string;
}

const userSchema: Schema = new Schema(
   {
      email: {
         type: String,
         required: true,
         lowercase: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      name: {
         type: String,
         required: true,
      },
   },
   { versionKey: false },
);

const User = moogose.model<IUser>('User', userSchema);

export default User;
