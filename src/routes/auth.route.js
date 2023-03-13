import { Router } from 'express';
import * as AuthService from '../controllers/auth'    // call reataurant controller
const authRoutes = Router();
// route for register
authRoutes.post('/register', (req, res) => {
    let request = req.body
    // call register function
    AuthService.registerUsers(request).then((resp) => {
        return res.json(resp).status(resp.status)
    }).catch(e => {
        return res.json(e).status(500)
    })
});
// route for login
authRoutes.post('/login', (req, res) => {
    let request = req.body
    // call login function
    AuthService.login(request).then((resp) => {
        return res.json(resp).status(resp.status)
    }).catch(e => {
        return res.json(e).status(500)
    })
});

export default authRoutes
