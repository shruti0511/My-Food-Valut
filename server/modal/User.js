const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: [String],
        default: ['User'], // Default role is "user"
      },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema)