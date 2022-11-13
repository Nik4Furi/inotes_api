const mongoose = require('mongoose');

//Check the module from 'package.json'
const validator = require('validator');

//Creating the schema to how save the users
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [5, "Name must be 5 char long"]
    },
    email: {
        type: String,
        required: true,
        minLength: [5, "Email must be 5 char long"],
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error(`${value} is not valid email`)
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must be 8 char long"]
    }
}, { timestamps: true })

//Define the collection name in database
const UserModal = new mongoose.model('User', UserSchema);

module.exports = UserModal;