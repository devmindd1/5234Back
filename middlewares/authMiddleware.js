const UserModel = require('../models/userModel');

module.exports = async function (req, res, next){
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            return res.status(401).json();
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken)
            return res.status(401).json();

        const userData = await UserModel.findOne({access_token: accessToken});
        if(!userData)
            return res.status(401).json();

        req.user = userData;
        next();
    }catch (e) {
        return res.status(401).json();
    }
};