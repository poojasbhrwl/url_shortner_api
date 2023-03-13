import authRoutes from './routes/auth.route';
import urlsRoutes from './routes/urls.route';
import { Router } from 'express';

const routes = Router();
routes.get('/healthCheck', async (req, res) => {
    const healthcheck = {
        message: 'OK'
    };
    res.send(healthcheck);
});

// use auth routes with url /auth
routes.use('/auth',  authRoutes);
// use urls routes with url /url
routes.use('/',  urlsRoutes);
  
export default routes