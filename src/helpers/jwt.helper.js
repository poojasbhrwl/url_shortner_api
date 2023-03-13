import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

export const JwtHelpers = (payload, expiresIn) =>  {
  let secret = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : 'secretkey';
  return jwt.sign(payload, secret , {
    expiresIn,
  });
}