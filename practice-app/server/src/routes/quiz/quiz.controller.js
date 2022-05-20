const axios = require("axios")

const { Quiz, QuizCategories } = require("../../models/quiz/quiz.model")


const quiz_url = 'https://opentdb.com/api.php'

async function onequizrequest(rr) {

    const input =
    {
        amount: rr._questionCount,
        category: rr._category,
        difficulty: rr._difficulty,
        type: "boolean",
        encode: 'url3986'
    }
    console.log("inpu" + input.category)

    if (input.category === "8") {
        input.category = "";
    }

    try {
        const response = (await axios.post(quiz_url, null, { params: input })).data
        var categoryno = rr._category
        var count = rr._questionCount

        if (response) {
            if (response.response_code == "0") {

                const results = response.results
                let tmp = results
                var questions = []
                console.log(results)

                for (let j = 0; j < tmp.length; j++) {
                    let x = decodeURIComponent(tmp[j].question)
                    let y = decodeURIComponent(tmp[j].correct_answer)
                    let z = decodeURI(tmp[j].incorrect_answers)

                    questions[j] = { "question": x, "correct_answer": y }
                    console.log(questions[j])

                }

                return [questions, categoryno, count]
            }

            else if (response.response_code == "1") {
                return [1, categoryno, count]
            }

            else if (response.response_code == "2") {
                return [2, categoryno, count]
            }
        }
        else {
            return [3, categoryno, count]
        }
    } catch (e) {
        return e
    }
}


const QuizController =
{
    oneShotCategorySaver: async function (req, res) {
        const quiz_url = 'https://opentdb.com/api_category.php';

        try {
            const response = (await axios.get(quiz_url)).data.trivia_categories;

            for (let i = 0; i < response.length; i++) {
                await QuizCategories.create
                    ({
                        category_id: response[i].id,
                        name: response[i].name,
                    })
            }
            return res.status(200).json(response);
        } catch (e) {
            return res.status(500).json({ message: "Could not initiate category information" })
        }
    },

    quizCategoryInfo: async function (req, res) {
        try {
            const response = await QuizCategories.find({}, 'category_id name')
            return res.status(200).json(response)
        }
        catch (e) {
            return res.status(500).json({ message: "Could not retrieve categories" })
        }
    },

    createQuiz: async function (req, res) {
        const user = "74EQuuHnACLWcjAG53sMsz9F52Z34oo0"//req.auth;

        const request = req.body.categories;
        var user_quiz = []
        var categories = []
        var count = 0

        if (!request || request.length === 0) {
            return res.status(400).json({ message: "You should at least give one input" })
        }

        for (let i = 0; i < request.length; i++) {

            let retval = await onequizrequest(request[i])
            var questions = retval[0]
            var category = retval[1]
            var qcount = retval[2]

            if (questions == 1) {
                return res.status(404).json("There are not enough questions")
            }
            else if (questions == 2) {
                return res.status(400).json("You have given an invalid input")
            }
            else if (questions == 3) {
                return res.status(500).json("Please try again")
            }
            else {
                categories.push(category)
                user_quiz = user_quiz.concat(questions)
                count += qcount
            }

            if (i == request.length - 1) {

                user_quiz = JSON.stringify(user_quiz)
                try {
                    const quiz = await Quiz.create(
                        {
                            user_id: user,
                            quiz_id: Date.now(),
                            questionCount: count,
                            categories: categories,
                            questions: user_quiz,
                        })
                    console.log(quiz)
                    return res.status(200).json(quiz)
                } catch (e) {
                    return res.status(500).json({ message: "Could not save the quiz" })
                }
            }

        }


    },
    userQuizzes: async function (req, res) {

        const user = "74EQuuHnACLWcjAG53sMsz9F52Z34oo0" //req.auth;
        try {
            const quizzes = await Quiz.find(
                { user },
                "quiz_id questions"
            );
            console.log(quizzes)
            return res.status(200).json({ quizzes });
        } catch (e) {
            return res
                .status(500)
                .json({ message: "Could not retrieve quizzes." });
        }
    },
    oneQuiz: async function (req, res) {
        const user = "74EQuuHnACLWcjAG53sMsz9F52Z34oo0" //req.auth;
        const quiz_id = req.params.quiz_id
        try {
            const quiz = await Quiz.find(
                { quiz_id },
                "user_id questions"
            );
            if (quiz[0].user_id === user) {
                return res.status(200).json(quiz[0]);
            }
            else
                return res.status(401).json({ message: "Not authorized" });
        } catch (e) {
            return res
                .status(500)
                .json({ message: "Could not retrieve quizzes." });
        }
    }
};

module.exports = QuizController
