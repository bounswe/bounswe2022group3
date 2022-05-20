import { useState } from "react"

const axios = require("axios");
import { API_URL } from "../../next.config";

export default function Home() {

    const [searchTerm, setSearchTerm] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [books, setBooks] = useState(null)

    async function fetchAll(e) {

        if(!searchTerm){

            return alert("Search Term Required!")
        }
        
       const resp= axios.get(`${API_URL}/books/getArticle?searchTerm=${searchTerm}&startDate=${startDate}&endDate=${endDate}`).data
        setBooks(resp)
    }
    async function key(e) {

        if(!searchTerm){

            return alert("Search Term Required!")
        }
        
       const resp= axios.get(`${API_URL}/books/getArticle?searchTerm=${searchTerm}&startDate=${startDate}&endDate=${endDate}`).data
       setSearchTerm(e.target.value)
    }
    
    return (
        <div style={{
            textAlign: "left",
            padding: 100
        }}>
        <form>
        <br />
        <br />
          <p>
          <label htmlFor="search">Enter a SINGLE search term : </label>     
          <input type="text" id="search"  onChange={key}></input>
          </p>
          <br />
          <p>
          <label htmlFor="start-date">Enter a start date (format YYYYMMDD): </label>
          <input type="date" id="start-date" className="start-date" pattern="[0-9]{8}" 
          onChange={e => setStartDate(e.target.value)}></input>
          </p>
          <br />
          <p>
          <label htmlFor="end-date">Enter an end date (format YYYYMMDD): </label>
          <input type="date" id="end-date" className="end-date" pattern="[0-9]{8}" 
          onChange={e => setEndDate(e.target.value)}></input>
          </p>
          <br />
          <br />
          <p>
          <button onClick = {fetchAll}>  Search </button>
          </p>
          <br />
          <br />

          <div>
                <h2>Results...</h2>

                <div id="allConversions">{books}</div>

            </div>
          </form>
        </div>
    )
}