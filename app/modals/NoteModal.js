const mongoose = require('mongoose');

//Create the schema how to save our notes
const noteSchema = mongoose.Schema({
    UserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    title : {
        type : String,
        required : true,
        minLength : [7,'title must be 7 char long']
    },
    description : {
        type : String,
        required : true,
        minLength : [12,'description must be 12 char long']
    },
    tag : {
        type : String,
        required : true,
        minLength : [5,'tag must be 5 char long'],
        default : 'general'
    }
},{timestamps:true})

//Creating the modal of notes
const noteModal = new mongoose.model('Note',noteSchema);

module.exports = noteModal;