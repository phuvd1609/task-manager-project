const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true,
    }
}, {collection: 'User'})

const User = mongoose.model('User', UserSchema)

module.exports = { User }