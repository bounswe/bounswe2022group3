const axios = require("axios")

const {Quiz, QuizCategories} = require("../../models/quiz/quiz.model")


const quiz_url = 'https://opentdb.com/api.php'

async function onequizrequest (rr) {

    const input = 
    {
        amount: rr._questionCount,
        category: rr._category,
        difficulty: rr._difficulty,
        type: rr._type,
        encode: 'url3986'
    }

    const response = (await axios.post(quiz_url, null, {params:input})).data
    var categoryno = rr._category
    var count = rr._questionCount
    
    if(response.response_code == "0")
    {
        const results = response.results
        let tmp = results
        var questions = []

        for (let j = 0; j< tmp.length; j++)
        {
            let x = decodeURIComponent(tmp[j].question)
            let y = decodeURIComponent(tmp[j].correct_answer)
            let z = decodeURI(tmp[j].incorrect_answers)

            questions[j] = x + ", " + y + ", " + z 
        }

        return [questions, categoryno, count]
    }
    
    else if(response.response_code == "1")
    {
        return [1, categoryno, count]
    }

    else if(response.response_code == "2")
    {
        return [2, categoryno, count]
    }

    else
    {
        return  [3, categoryno, count]
    }
}


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
        const request = req.body.categories;
        var user_quiz = []
        var categories = []
        var count = 0

        for(let i = 0; i < request.length; i++)
        {

            let retval = await onequizrequest(request[i])
            var questions = retval[0]
            var category = retval[1]
            var qcount = retval[2]

            if(questions == 1)
            {
                return res.json("There are not enough questions")
            }
            else if(questions == 2)
            {
                return res.json("You have given an invalid input")
            }
            else if(questions == 3)
            {
                return res.status(404).json("Please try again")
            }
            else
            {
                categories.push(category)
                user_quiz  = user_quiz.concat(questions)
                count += qcount
            }
            
            if(i == request.length -1){

                const quiz = await Quiz.create
                ({
                    quiz_id : 9,
                    questionCount : count,
                    categories: categories,
                    questions : user_quiz,
                })
                return res.status(200).json("Here is your quiz:\n" + quiz)
            }

        }
        return res.status(500)

    }


};

module.exports = QuizController
