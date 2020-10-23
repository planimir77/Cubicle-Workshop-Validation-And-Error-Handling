const mongoose = require('mongoose');
const validator = require('node-mongoose-validator');

const inputRegexValidator = {
    validator: (inputData) => {
        return /^[A-Za-z0-9]*$/.test(inputData);
    },
    message: x => `${x.path} could be English letters, digits and whitespaces`,
}

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        validate: inputRegexValidator,
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        validate: inputRegexValidator,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: validator.isURL({ protocols: ['http', 'https',], require_protocol: true, }),
    },
    cubes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cube', },],
});

module.exports = mongoose.model('Accessory', accessorySchema, 'accessories');