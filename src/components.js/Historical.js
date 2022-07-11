import React from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'

function Historical(props) {

    const [histCases, setHistCases] = React.useState([])
    const [histDeaths, setHistDeaths] = React.useState([])
    const [dates, setDates] = React.useState([])

    const options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/history',
        params: {country: 'usa', day: '2020-06-02'},
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_HISTORICAL_API,
          'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        }
    };
      
    
      const getHistData = async () => {
        let cases = []
        let deaths = []
        let dates = []
        const response = await axios.request(options)
        for (let i=0; i<response.data.response; i++){
            cases.push(response.data.response[i].cases.total)
            deaths.push(response.data.response[i].deaths.total)
            dates.push(response.data.response[i].day)
        }
        setHistCases(cases)
        setHistDeaths(deaths)
        setDates(dates)
        console.log(response.data.response)
      }

          const lineChartData = {
            labels: dates,
            datasets: [
                {
                  data:histCases,
                  label: "Cases"
                }
            ]
          }

  return (
    <div className="Historical">
     <button onClick={getHistData}>press me</button>
    </div>
  );
}

export default Historical;
