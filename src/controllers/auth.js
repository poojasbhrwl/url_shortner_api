import { Users } from '../models/users.model'
import { JwtHelpers } from '../helpers/jwt.helper'

export const registerUsers = async (req, res, next) => {
  try {
    const request = req.body
    const alreadyExist = await Users.findOne({email: request.email})  // check already exists with same email
    if(alreadyExist && alreadyExist._id) {
      const data = { data: await alreadyExist.toJSON(), message: "User already exists"}
      res.status(409).send(data); // return response if already exists
    } else {
      const data = await new Users(request);  // create object for user
      const userData = await data.save();  // save the data
      const resp = { data: await userData.toJSON(), message: "Registered successfully"}
      return res.status(201).send(resp) // return response after registration
    }
  } catch (e ) {
    return res.status(500).send({error: e, message: "Something went wrong"})  // return response if error
  }
}
  
  // create function for login users
export const login = async (req, res) => {
  try {
    const request = req.body
    let userData = await Users.findOne({email: request.email})  // check user exists with email
    if(!userData) {
      const data = { data: {}, message: "User doesn't exists"}
      return res.status(404).send(data) // return response if doesn't exists
    } else {
      let comparison = await userData.comparePassword(request.password);
      if(comparison) {
        const user = await userData.toJSON()
        const token = JwtHelpers({ id: user._id, role: user.role }, '7d')
        const data = { data: userData, token: token,  message: "Logged in successfully"}
        return res.status(200).send(data) 
      } else {
        const data = {data: {}, message: "Wrong password"}  // return response if wrong password
        return res.status(403).send(data)
      }
    }
  } catch (e) {
    return res.status(500).send({error: e, message: "Something went wrong"}) // return response if error
  }
}

