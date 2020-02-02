const jwt = require('jsonwebtoken');
const role=require('../util/role');
var config = require('../util/config');

const adminRole = (req, res, next)=>{

    try {
        const token = req.header('x-access-token');
        if (!token)
            return res.status(403).send({ auth: false, message: 'No token provided.' });
    
        const decoded = jwt.verify(token, config.secret);       
        if(req.originalUrl == role.admin)
            {
                req.user=decoded
                next();
            }
        else
            return res.status(401).
                send('Access Denied: You dont have correct privilege to perform this operation');
        }
    catch (ex) {
    res.status(401).send('Invalid Token')
    }
};

module.exports = adminRole;