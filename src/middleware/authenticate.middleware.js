import jwt from 'jsonwebtoken';
import { Users } from '../models/users.model'

export const verifyAdminRole = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) {
            return res.status(401).json({message: "Unauthorized access"})
        }

        jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
            if (err) return res.sendStatus(401).json({message: "Unauthorized access"})
            let userData = await Users.findOne({_id: user.id})
            if(userData && userData.role == 'Admin') 
            next()
            else
            return res.sendStatus(401).json({message: "Unauthorized access"})
        })
     } catch (e) {
        console.error(e)
        return res.sendStatus(401).json({message: "Unauthorized access"})
    }
}

export const verifyUserRole = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) {
            return res.status(401).json({message: "Unauthorized access"})
        }

        jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
            if (err) return res.sendStatus(401).json({message: "Unauthorized access"})
            let userData = await Users.findOne({_id: user.id})
            console.log(userData)
            if(userData && userData._id) 
            next()
            else
            return res.sendStatus(401).json({message: "Unauthorized access"})
        })
     } catch (e) {
        console.error(e)
        return res.sendStatus(401).json({message: "Unauthorized access"})
    }
}