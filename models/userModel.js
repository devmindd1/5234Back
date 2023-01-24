const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    phone_number: {type: String, required: true},
    username: {type: String, required: true},
    amount_locations: {type: Number, required: true},
    organization_name: {type: String, required: true},
    address: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    access_token: {type: String},
});

module.exports = model('User', UserSchema);