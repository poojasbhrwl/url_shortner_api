import { Router } from 'express';
import { getUrl, createUrl } from '../controllers/urls';
import { verifyAdminRole, verifyUserRole } from '../middleware/authenticate.middleware';
import { urlValidation } from '../validations/urls.validation';
const urlRoutes = Router();

// route for get url
urlRoutes.get('/:code', verifyUserRole, getUrl);

// route for create new url
urlRoutes.post('/', verifyAdminRole, urlValidation, createUrl);
export default urlRoutes
