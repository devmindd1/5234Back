const {validationResult} = require('express-validator');
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const UserDto = require('../dtos/userDto');
const apiResponse = require('../helpers/apiResponse');
const crypto = require("crypto");

class UserController{
    async signUp(req, res){
        const response = new apiResponse();
        const form = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            response.validationErrors = errors.array();
            return res.status(400).json(response);
        }

        form.password = await bcrypt.hash(form.password, 3);
        form.access_token = crypto.randomBytes(64).toString('hex');

        response.user = new UserDto(await UserModel.create(form));
        response.access_token = form.access_token;

        return res.json(response);
    }

    async login(req, res){
        const response = new apiResponse();
        const {email, password} = req.body;

        const user = await UserModel.findOne({email});
        if(!user){
            response.errorMessage = 'email or password is wrong';
            return res.status(400).json(response);
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals){
            response.errorMessage = 'email or password is wrong';
            return res.status(400).json(response);
        }

        response.user = new UserDto(user);
        response.access_token = crypto.randomBytes(64).toString('hex');

        await UserModel.updateOne(
            {_id: user._id},
            {$set:{access_token: response.access_token}}
        );

        return res.status(200).json(response);
    }

    async logout(req, res){
        const response = new apiResponse();

        await UserModel.updateOne(
            {_id: req.user._id},
            {$set:{access_token: ''}}
        );

        return res.json(response);
    }

}

module.exports = new UserController();