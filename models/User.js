const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        validate: {
            validator: (inputData) => {
                const result = /^[A-Za-z0-9]*$/.test(inputData);
                return result;
            },
            message: props => `${props.path} сhould consist only with English letters and digits`,
        },
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('User', userSchema, 'users');
