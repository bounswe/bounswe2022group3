const axios = require("axios");
const booksApiUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
const booksApiKey = 'GJ2wwmlL6MKs4tTBfWgHgxyOeTRABYUi' 


const booksController = {
    getArticle: async function (req, res) {
      const { searchTerm, startDate, endDate } = req.query
      console.log("burda")
      console.log(`${booksApiUrl}?q=${searchTerm}&api-key=${booksApiKey} `)
      let url = `${booksApiUrl}?q=${searchTerm}&api-key=${booksApiKey} &fq=document_type:("article")`;

      if (startDate.value !== '') {
        url = `${url}&begin_date=${startDate.value}`;
      };
    
      if (endDate.value !== '') {
        url = `${url}&end_date=${endDate.value}`;
      };

      const resp= JSON.parse((await axios.get(url , {transformResponse: [v => v]})).data)
      console.log("burda server ")
      console.log(resp)  
      res.status(200).send({ value: resp })


    },
    key: async function (req, res) {   

    } 
};

module.exports = booksController;