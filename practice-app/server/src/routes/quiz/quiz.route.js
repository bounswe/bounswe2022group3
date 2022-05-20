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
 *     parameters:
 *       - quiz_id:
 *          type:string 
 *     responses:
 *       "200":
 *         description: Successful
 *         schema:
 *          type: object
 *              properties:
 *                  quizzes:
 *                      type: array
 *                      items: 
 *                          properties:
 *                              quiz_id: 
 *                                  type: string
 *                              question_count:  
 *                                  type: string 
 *                  example:
 *                      quizzes:
 *                          [
 *                          quiz_id: "1652992986066"
 *                          questions: [
 *                                     {
 *                                         _id: new ObjectId("6286abdace077d896bb20b62"),
 *                                         quiz_id: '1652992986066',
 *                                         questions: [
 *                                              `[
 *                                              {"question":"The Neanderthals were a direct ancestor of modern humans.", "correct_answer":"False"},
 *                                              {"question":"FLAC stands for \\"Free Lossless Audio Condenser\\"'","correct_answer":"False"},
 *                                              {"question":"Brezhnev was the 5th leader of the USSR.","correct_answer":"True"},
 *                                              {"question":"Tetris is the #1 best-selling video game of all-time.","correct_answer":"False"},
 *                                              {"question":"In Rugby League, performing a \\"40-20\\" is punished by a free kick for the opposing team.","correct_answer":"False"},
 *                                              {"question":"EDM label Monstercat signs tracks instead of artists.", "correct_answer":"True"},
 *                                              {"question":"Linux was first created as an alternative to Windows XP.","correct_answer":"False"},
 *                                              {"question":"Watch_Dogs 2 is a prequel.","correct_answer":"False"},
 *                                              {"question":"Water always boils at 100°C, 212°F, 373.15K, no matter where you are.","correct_answer":"False"},
 *                                              {"question":"The Statue of Liberty's official name is “Liberty Enlightening the World”.","correct_answer":"True"},
 *                                              {"question":"Norwegian producer Kygo released a remix of the song \\"Sexual Healing\\" by Marvin Gaye.","correct_answer":"True"},
 *                                              {"question":"The binary number \\"101001101\\" is equivalent to the Decimal number \\"334\\"","correct_answer":"False"},
 *                                              {"question":"Shaquille O'Neal appeared in the 1997 film \\"Space Jam\\".","correct_answer":"False"},
 *                                              {"question":"Solid Snake is actually a clone from the DNA of Big Boss in the Metal Gear Solid series' history.","correct_answer":"True"},
 *                                              {"question":"Instant mashed  potatoes were invented by Canadian Edward Asselbergs in 1962.","correct_answer":"True"}
 *                                              ]`
 *                                          ]
 *                                     },
 *                                     {
 *                                         _id: new ObjectId("6286b142a69508ee1b3c25f5"),
 *                                         quiz_id: '1652994370172',
 *                                         questions: [
 *                                              `[
 *                                              {"question":"Despite being seperated into multiple countries, The Scandinavian countries are unified by all having the same monarch.","correct_answer":"False"},
 *                                              {"question":"In Half-Life 2, if you play the zombies' speech in reverse, they actually speak coherent English.","correct_answer":"True"},
 *                                              {"question":"The Angry Video Game Nerd's alter ego is \\"Board James\\".","correct_answer":"True"},
 *                                              {"question":"The Sonoran Desert is located in eastern Africa.","correct_answer":"False"},
 *                                              {"question":"Is Tartu the capital of Estonia?","correct_answer":"False"}
 *                                              ]`
 *                                          ]
 *                                     },
 *                                     {
 *                                         _id: new ObjectId("6286b14ba69508ee1b3c25f7"),
 *                                         quiz_id: '1652994379113',
 *                                         questions: [
 *                                              '[
 *                                              {"question":"San Marino is the only country completely surrounded by another country.","correct_answer":"False"},
 *                                              {"question":"The 2005 video game \\"Call of Duty 2: Big Red One\\" is not available on PC.","correct_answer":"True"},
 *                                              {"question":"In association football, or soccer, a corner kick is when the game restarts after someone scores a goal.","correct_answer":"False"},
 *                                              {"question":"Tupac Shakur died due to complications from being stabbed in 1996.","correct_answer":"False"},
 *                                              {"question":"The shotgun appears in every numbered Resident Evil game.","correct_answer":"True"}
 *                                              ]'
 *                                         ]
 *                                      }
 *                                  ]
 *        "500":
 *         description: Could not retrieve category information
 *         schema:
 *          type: object
 *              properties:
 *                  message:
 *                      type: string
 *                  example:
 *                      message: "Could not retrieve quizzes."
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
 *     responses:
 *       "200":
 *         description: Successful
 *         schema:
 *          type: object
 *              properties:
 *                  user_id: 
 *                      type: string
 *                  questions:  
 *                      type: array
 *                      items:
 *                          question:
 *                              type:string
 *                          correct_answer:
 *                              type:string 
 *                  example:
 *                      user_id: "74EQuuHnACLWcjAG53sMsz9F52Z34oo0"
 *                      "questions":[
 *                          { 
 *                          "question":
 *                              "In Monster Hunter Generations, guild style is a type of hunting style. 
 *                          "correct_answer":
 *                              "True"
 *                          },
 *                          {
 *                          "question":
 *                                 "Linux was first created as an alternative to Windows XP."
 *                          "correct_answer":"False"
 *                          },
 *                      ]
 *       "401":
 *         description: Not Authorized
 *         schema:
 *          type: object
 *              properties:
 *                  message:
 *                      type: string
 *                  example:
 *                      message: "Not Authorized"
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
    "/view/:quiz_id",
    authorization
    quizController.oneQuiz
)
module.exports = quizRouter;
