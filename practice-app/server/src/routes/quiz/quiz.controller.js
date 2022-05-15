const axios = require("axios");
const {QuizCategories} = require("../../models/quiz/quiz.model");


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

};

module.exports = QuizController; 