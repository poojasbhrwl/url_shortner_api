import { Router } from 'express';
import * as AuthService from '../controllers/auth'    // call reataurant controller
import { registerUsersValidation, loginValidation } from '../validations/users.validation';
const authRoutes = Router();
// route for register
authRoutes.post('/register', registerUsersValidation, AuthService.registerUsers);
// route for login
authRoutes.post('/login', loginValidation ,AuthService.login);

export default authRoutes
