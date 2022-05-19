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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Successful
 *         schema:
 *          type: object
 *              properties:
 *                  category_id:
 *                      type: string
 *                  name:
 *                      type: string
 *                  example:
 *                      category_id: "9"
 *                      name: "General Knowledge"
 *       "500":
 *         description: Could not retrieve category information
 *         schema:
 *          type: object
 *              properties:
 *                  message:
 *                      type: string
 *                  example:
 *                      message: "Could not retrieve categories."
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
 *        description: "Should "
 *        required: false
 *        content:
 *           application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   categories:
 *                      type: object
 *                      items:
 *                          _questionCount:
 *                              type: integer
 *                              minimum: 1
 *                              maximum: 50
 *                              description: Number of questions
 *                          _category:
 *                              type: integer
 *                              minimum: 9
 *                              maximum: 32
 *                              description: Category of the questions
 *                          _difficulty:
 *                              type: string
 *                              description: Difficulty level of the questions
 *     responses:
 *       "200":
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      quiz_id:
 *                          type: string
 *                      questions:
 *                          type: array
 *                          items:
 *                              question:
 *                                  type: string
 *                              correct_answer: 
 *                                  type: string
 *                  example:
 *                      quiz_id: "9"
 *                      questions: [{"General Knowledge"}]
 *       "500":
 *         description: Could not retrieve category information
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                  example:
 *                      message: "Could not retrieve categories."
 *       "400":
 *         description: Given input is invalid
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                  example:
 *                      message: "You have given an invalid input"
 *       "404":
 *         description: There are not enough questions
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                  example:
 *                      message: "There are not enough questions"
 *       "500":
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *                  oneOf:
 *                     - type: object
 *                       properties:
 *                          message:
 *                              type: string
 *                      example:
 *                          message: "Please try again later"
 *                     - type: object
 *                       properties:
 *                          message:
 *                              type: string
 *                      example:
 *                          message: "Could not save the quiz"
 */
quizRouter.post(
    "/new_quiz",
    validate("create_quiz"),
    handleValidation,
    quizController.createQuiz
);

/**
 * @swagger
 * /quiz/view:
 *   get:
 *     summary: View User's Games
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
 *         schema:
 *          type: object
 *              properties:
 *                  quizzes:
 *                      type: array
 *                          items: 
 *                              properties:
 *                                  quiz_id: 
 *                                      type: string
 *                                  question_count:  
 *                                      type: string 
 *                                  categories:  
 *                                      type: array                                  questions:  
 *                                      type: array
 *                  example:
 *                      category_id: "9"
 *                      name: "General Knowledge"
 *       "500":
 *         description: Could not retrieve category information
 *         schema:
 *          type: object
 *              properties:
 *                  message:
 *                      type: string
 *                  example:
 *                      message: "Could not retrieve categories."
 */
quizRouter.get(
    "/view",
    authorization,
    quizController.userQuizzes
)

module.exports = quizRouter;
