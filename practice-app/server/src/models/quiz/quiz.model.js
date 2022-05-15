const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    
    category_id: {
        type: String,
        default: "",
        required: true,
    },
    name: {
        type: String,
        default: "",
    },
});

const quizSchema = new mongoose.Schema
({
    quiz_id : {type : String},
    question_count : {type : String},
    categories : {type : [String]},
    questions : {type : [String]},
});

/*const questionSchema = new mongoose.Schema
({
    question_body : {type : String},
    correct_answer : {type : String},
    incorrect_answers : {type : [String]},
});*/

const Quiz = mongoose.model("Quiz", quizSchema)
//const Question = mongoose.model("Question", questionSchema)
const QuizCategories = mongoose.model("QuizCategories", categorySchema)
module.exports = {Quiz, QuizCategories}

