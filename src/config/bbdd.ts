import colors from "colors";
import mongoose from "mongoose";
import { exit } from "node:process";

export const connectDB = async () => {
   try{
      const {connection} = await mongoose.connect(process.env.DATABASE_URL);
      const url = `${connection.host}:${connection.port}`;
      console.log(colors.magenta.bold(`Connected to MongoDB at ${url}`));
   }catch(error){
      console.log(error);
      exit(1);
   }
}