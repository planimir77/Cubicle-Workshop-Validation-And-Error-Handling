const mongoose = require('mongoose');
const validator = require('node-mongoose-validator');

const inputRegexValidator = { 
    validator: (inputData) => {
        return /^[A-Za-z0-9]*$/.test(inputData);
    },
    message: x => `${x.path} could be English letters, digits and whitespaces`,
}

const cubeSchema = new mongoose.Schema({
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
    difficultyLevel: { type: Number, required: true, min: 1, max: 6, },
    accessories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Accessory', },],
});

module.exports = mongoose.model('Cube', cubeSchema, 'cubes');

// <---------- Cube model for local storage database.json   ------------------>

// const uniqid = require('uniqid');
// const fs = require('fs');
// const path = require('path');
// const database = path.join(__dirname, '../config/database.json');

// class Cube {
//     constructor(name, description, imageUrl, difficultyLevel) {
//         this.id = uniqid();
//         this.name = name || "No name";
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this.difficultyLevel = difficultyLevel || 0;

//     }

//     // saveCube
//     save () {
//         const entity = {
//             id: this.id,
//             name: this.name,
//             description: this.description,
//             imageUrl: this.imageUrl,
//             difficultyLevel: this.difficultyLevel,
//         };

//         fs.readFile(database, (error, data)=>{
//             if (error) throw error;

//             const cubes = JSON.parse(data);
//             cubes.push(entity);

//             fs.writeFile(database, JSON.stringify(cubes), error => {
//                 if (error){
//                     throw error;
//                 }

//                 console.log("New cube is created");
//             });
//         });

//     }
// }

// module.exports = Cube;