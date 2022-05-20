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
        user_id: {
            type: String,
            required: [true],
        },
        quiz_id: {
            type: String,
            required: [true]
        },
        question_count: { type: String },
        categories: { type: [String] },
        questions: { type: [String] },
    });

const Quiz = mongoose.model("Quiz", quizSchema)
const QuizCategories = mongoose.model("QuizCategories", categorySchema)
module.exports = { Quiz, QuizCategories }

