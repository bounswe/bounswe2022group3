const axios = require("axios");
const {Quiz, QuizCategories} = require("../../models/quiz/quiz.model");


const QuizController = 
{
    oneShotCategorySaver: async function (req,res) 
    {
        const quiz_url = 'https://opentdb.com/api_category.php';

        const response = (await axios.get(quiz_url)).data.trivia_categories;

        for (let i = 0; i < response.length; i++)
        {
            await QuizCategories.create
            ({
                category_id: response[i].id,
                name: response[i].name,
            })
        }
        return res.status(200).json(response);
    },

    quizCategoryInfo: async function (req,res) 
    {
        try
        {
            const response = await QuizCategories.find({}, 'category_id name')
            return res.status(200).json(response)
        }        
        catch(e)
        {
            return res.status(500).json({message: "Could not retrieve categories"})
        }
    },

    createQuiz: async function (req,res)
    {
        const {_questionCount, _category, _difficulty, _type} = req.body;

        const quiz_url = 'https://opentdb.com/api.php'

        const input = 
        {
            amount: _questionCount,
            category: _category,
            difficulty: _difficulty,
            type: _type,
            encode: 'url3986'
        }

        const response = (await axios.post(quiz_url, null, {params:input})).data

        if(response.response_code == "0")
        {
            const results = response.results
            let tmp = results
            const questions = []

            for (let j = 0; j< tmp.length; j++)
            {
                let x = decodeURIComponent(tmp[j].question)
                let y = decodeURIComponent(tmp[j].correct_answer)
                let z = decodeURI(tmp[j].incorrect_answers)

                questions[j] = x + ", " + y + ", " + z 
                console.log("x, y, ve z : " + x+ y+ z);
            }

            const quiz = await Quiz.create
            ({
                quiz_id : 7,
                questionCount : _questionCount,
                categories: [_category],
                questions : questions,

            })
            res.status(200).json({quiz})
        }
        
        
    }

};

module.exports = QuizController; 