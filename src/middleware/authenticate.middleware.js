import jwt from 'jsonwebtoken';
import { Users } from '../models/users.model'

export const verifyAdminRole = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) {
            return res.status(401).send({message: "Unauthorized access"})
        }
        const user = await jwt.verify(token, process.env.TOKEN_SECRET)
        let userData = await Users.findById(user.id)
        if(userData && userData.role == 'Admin') 
        next()
        else
        return res.status(401).send({message: "Unauthorized access"})
     } catch (e) {
        return res.status(401).send({message: "Unauthorized access"})
    }
}

export const verifyUserRole = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) {
            return res.status(401).send({message: "Unauthorized access"})
        }
        const user = await jwt.verify(token, process.env.TOKEN_SECRET)
        let userData = await Users.findById(user.id)
        if(userData && userData._id) 
        next()
        else
        return res.status(401).send({message: "Unauthorized access"})
     } catch (e) {
        return res.status(401).send({message: "Unauthorized access"})
    }
}