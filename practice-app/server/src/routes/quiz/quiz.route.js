const express = require("express");
const quizController = require("./quiz.controller");
const { validate } = require("./quiz.validate");
const { handleValidation } = require("../../services/validate");
const { authorization } = require("../../services/auth");
const quizRouter = express.Router();

/*quizRouter.get
(
    "/one_shot",
    quizController.oneShotCategorySaver
);*/

/**
 * @swagger
 * /quiz/categories:
 *   get:
 *     summary: View Available Categories 
 *     tags: [Quiz]
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     responses:
 *       "200":
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   category_id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   example:
 *                       category_id: "9"
 *                       name: "General Knowledge"
 *       "500":
 *         description: Could not retrieve category information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   message:
 *                     type: string
 *                   example:
 *                     message: "Could not retrieve categories."
 */
quizRouter.get(
    "/categories",
    quizController.quizCategoryInfo
);

/**
 * @swagger
 * /quiz/new_quiz:
 *   post:
 *     summary: Create a new quiz
 *     tags: [Quiz]
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *        description: "Should give an input"
 *        required: true
 *        content:
 *           application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   categories:
 *                     type: object
 *                     properties:
 *                       _questionCount:
 *                           type: integer
 *                           minimum: 1
 *                           maximum: 50
 *                           description: Number of questions
 *                       _category:
 *                           type: integer
 *                           minimum: 9
 *                           maximum: 32
 *                           description: Category of the questions
 *                       _difficulty:
 *                           type: string
 *                           description: Difficulty level of the questions
 *     responses:
 *       "200":
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   quiz_id:
 *                       type: string
 *                   questions:
 *                       type: array
 *                       items:
 *                          type: object
 *                 example:
 *                   quiz_id: "9"
 *                   questions: [{question : "xx" , correct_answer: "yy"}]
 *       "400":
 *         description: Given input is invalid
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                 example:
 *                   message: "You have given an invalid input"
 *       "404":
 *         description: There are not enough questions
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                       type: string
 *                 example:
 *                   message: "There are not enough questions"
 *       "500":
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *                  oneOf:
 *                   - type: object
 *                     properties:
 *                          message:
 *                              type: string
 *                     example:
 *                          message: "Please try again later"
 *                   - type: object
 *                     properties:
 *                          message:
 *                              type: string
 *                     example:
 *                          message: "Could not save the quiz"
 */
quizRouter.post(
    "/new_quiz",
    validate("create_quiz"),
    handleValidation,
    authorization,
    quizController.createQuiz
);


/**
 * @swagger
 * /quiz/view/all:
 *   get:
 *     summary: View User's Saved Quizzes
 *     tags: [Quiz]
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Successful
 *         content:
 *            application/json:
 *                schema:
 *                  type: object
 *                properties:
 *                  user_id: 
 *                    type: string
 *                  questions:  
 *                    type: array
 *                    items:
 *                      question:
 *                        type:string
 *                      correct_answer:
 *                        type:string 
 *                example:
 *                  user_id: "74EQuuHnACLWcjAG53sMsz9F52Z34oo0"
 *                  questions: [{question: "In Monster Hunter Generations, guild style is a type of hunting style." , correct_answer: "True"}]
 *       "401":
 *         description: Not Authorized
 *         content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                  example:
 *                    message: "Not Authorized"
 *       "500":
 *         description: Could not retrieve category information
 *         content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                  example:
 *                    message: "Could not retrieve categories."
 *     
 */
quizRouter.get(
    "/view/all",
    authorization,
    quizController.userQuizzes
)

/**
 * @swagger
 * /quiz/view/[quiz_id]:
 *   get:
 *     summary: View a Specific Quiz
 *     tags: [Quiz]
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: quiz_id
 *         description: "ID of the requested quiz"
 *         required: true
 *         schema: 
 *            type: string 
 *     responses:
 *       "200":
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quizzes:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                         quiz_id: 
 *                           type: string
 *                         questions:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               question:
 *                                 type: string
 *                               correct_answer:
 *                                  type: string
 *               example:
 *                 quizzes: [{quiz_id: "9", questions: [{question: "In Monster Hunter Generations, guild style is a type of hunting style.", correct_answer: "True"}]}]                          
 *       "500":
 *         description: Could not retrieve category information
 *         schema:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                  example:
 *                      message: "Could not retrieve quizzes."
 *     
 */
quizRouter.get(
    "/view/:quiz_id",
    authorization,
    quizController.oneQuiz
)
module.exports = quizRouter;
