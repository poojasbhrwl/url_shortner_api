import { Users } from '../models/users.model'
import { registerUsersValidation, loginValidation } from '../validations/users.validation'
import { JwtHelpers } from '../helpers/jwt.helper'

export const registerUsers = async (request) => {
  const response = {status: 201}
  try {
    const validate = await registerUsersValidation(request)  // validate request params
    let alreadyExist = await Users.findOne({email: validate.email})  // check already exists with same email
    if(alreadyExist && alreadyExist._id) {
      response.status = 500
      response.data = await alreadyExist.toJSON()
      response.error = {message: "User already exists"}  // return response if already exists
    } else {
      const data = await new Users(validate);  // create object for user
      let userData = await data.save();  // save the data
      response.data = await userData.toJSON()
    }
  } catch (e ) {
    console.log(e)
    response.status = 500
    response.error = e
  }
  return response;  // return response
}
  
  // create function for login users
export const login = async (request) => {
    
  const response = {status: 200}
  try {
    const validate = await loginValidation(request)  // validate request body
    let userData = await Users.findOne({email: validate.email})  // check user exists with email
    if(!userData) {
      response.status = 500
      response.error = {message: "User doesn't exists"}  // return response if doesn't exists
    } else {
      let comparison = await userData.comparePassword(validate.password);
      if(comparison) {
        response.token = JwtHelpers({ id: userData._id, role: userData.role }, '1d'),
        response.user = await userData.toJSON();
        response.message = 'Login successfully'
      } else {
        response.status = 500
        response.error = {message: "Wrong password"}  // return response if wrong password
      }
    }
  } catch (e) {
    response.status = 500
    response.error = e
  }
  return response;  // return response
}

