import { Router } from 'express';
import { getUrl, createUrl } from '../controllers/urls';
import { verifyAdminRole, verifyUserRole } from '../middleware/authenticate.middleware'
const urlRoutes = Router();

// route for get url
urlRoutes.get('/:code', verifyUserRole, (req, res) => {
    let request = req.params  // create object for request
    // call get url controller
    getUrl(request).then(resp => {ß
        if(resp.status == 200) {
            return res.send(resp.data.originalUrl).status(resp.status)
        }
        return res.send(resp).status(resp.status)
    }).catch(e => {
        return res.send(e).status(500)
    })
});

// route for create new url
urlRoutes.post('/', verifyAdminRole, (req, res) => {
    let request = {originalUrl: req.body.originalUrl, baseUrl: req.protocol + '://' + req.get('host')}
    // call create url controller
    createUrl(request).then(resp => {
        return res.send(resp).status(resp.status)
    }).catch(e => {
        return res.status(500).send(e)
    })
});
export default urlRoutes
