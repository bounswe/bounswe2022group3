const express = require("express");
const { validate } = require("./lyrics.validate");
const { handleValidation } = require("../../services/validate");
const LyricsController = require("./lyrics.controller");
const { authorization } = require("../../services/auth");


const lyricsRouter = express.Router();

/**
 * @swagger
 * /lyrics/search_lyrics:
 *  post:
 *      summary: search lyrics
 *      tags: [Lyrics]
 *      consumes: 
 *          - "application/json"
 *      produces:
 *          - "application/json"
 *      requestBody:
 *          description: "Searches lyrics with the given parameter"
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          search_parameter:
 *                              type: string
 * 
 *      responses:
 *          "200":
 *              description: Search successfull
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              searchresult:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          full_title:
 *                                              type: string
 *                                          url:
 *                                              type: string
 *                                          lyrics_id:
 *                                              type: number
 *                          example:
 *                                     "searchresult": [
 *                                         {
 *                                             "full_title": "Rap God by Eminem",
 *                                             "url": "https://genius.com/Eminem-rap-god-lyrics",
 *                                             "lyrics_id": 235729
 *                                         }
 *                                      ]
 *          "400": 
 *              description: Could not do the search. someting went wrong.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:    
 *                                  type: string
 *                          example:
 *                              message:  "Could not do the search" 
 *                
 * /lyrics/save_lyrics:
 *  post:
 *      summary: save lyrics
 *      tags: [Lyrics]
 *      consumes: 
 *          - "application/json"
 *      produces:
 *          - "application/json"
 *      requestBody:
 *          description: "Saves selected lyrics"
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          full_title:
 *                              type: string
 *                          url:
 *                              type: string
 *                          lyrics_id:
 *                              type: number
 *      responses:
 *          "200":
 *              description: Show successfull
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              searchresult:
 *                                  type: object
 *                                  properties:
 *                                      lyrics_id:
 *                                          type: number
 *                          example:
 *                              {
 *                                  "lyrics_id": 811
 *                              }
 *          "400": 
 *              description: Could not save the lyrics. someting went wrong.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:    
 *                                  type: string
 *                          example:
 *                              message: "Could not save the lyrics"  
 * /lyrics/saved_lyrics:
 *  get: 
 *      summary: show saved lyrics
 *      tags: [Lyrics]
 *      produces:
 *          - "application/json"
 *      responses:
 *          "200":
 *              description: Show successfull
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              saved_lyrics:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          full_title:
 *                                              type: string
 *                                          url:
 *                                              type: string
 *                                          lyrics_id:
 *                                              type: number
 *                          example:
 *                                     "saved_lyrics": [
 *                                         {
 *                                             "full_title": "Rap God by Eminem",
 *                                             "url": "https://genius.com/Eminem-rap-god-lyrics",
 *                                             "lyrics_id": 235729
 *                                         }
 *                                      ]             
 */

lyricsRouter.post(
    "/search_lyrics",
    validate("search_lyrics"),
    handleValidation,
    LyricsController.searchLyrics
);

lyricsRouter.post(
    "/save_lyrics",
    validate("save_lyrics"),
    handleValidation,
    authorization,
    LyricsController.saveLyrics
);

lyricsRouter.get(
    "/saved_lyrics",
    validate("saved_lyrics"),
    handleValidation,
    authorization,
    LyricsController.savedLyrics
);

module.exports = lyricsRouter;
