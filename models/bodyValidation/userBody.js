const {body} = require("express-validator");
const UserModel = require('../userModel');
const signUpBody = [
    body('first_name').notEmpty().trim().withMessage('First name is require'),
    body('last_name').notEmpty().trim().withMessage('Last name is require'),
    body('phone_number').notEmpty().trim().withMessage('Phone number is require'),
    body('username').isLength({ min: 8 }).withMessage('Username min size 6 symbols'),
    body('username').notEmpty().trim().withMessage('Username is require'),
    body('amount_locations').notEmpty().trim().withMessage('Amount of Locations is require'),
    body('amount_locations').isNumeric().isLength({ min: 0, max: 2 }),
    body('organization_name').notEmpty().trim().withMessage('Organization name is require'),
    body('address').notEmpty().trim().withMessage('Address is require'),
    body('email').isEmail().normalizeEmail().withMessage('Please write valid email')
        .custom(async value => {
            return UserModel.findOne({email: value}).then(user => {
                if(user) throw new Error('Email is exists');
            });
        }),
    body('email').notEmpty().withMessage('Email is require'),
    body('password').isLength({ min: 6 }).withMessage('Password min size 6 symbols'),
    body('password').notEmpty().withMessage('Password is require'),
    body('password_confirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
];

module.exports = {
    signUpBody
};
