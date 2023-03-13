import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config()
export const connect = () => {
  // connection function for mongoose
     mongoose.connect(`mongodb://${process.env.MONGOSERVER}/${process.env.DATABASE}`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch((err) => {
         console.error('Database connection error',err)
       })
  }