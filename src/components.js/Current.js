import React from 'react'
import axios from 'axios'
import Dropdown from './Dropdown'
import Historical from './Historical'

function Current() {
  const [currentWorldData, setCurrentWorldData] = React.useState([])

  const [worldStats, setWorldStats] = React.useState([])

  const contArr = ['Africa', 'Asia', 'Europe', 'Oceania', 'North-America', 'South-America']
  const [continent, setContinent] = React.useState('')

  const [countryArr, setCountryArr ]= React.useState([])
  const [country, setCountry] = React.useState('')

  // params
  // , day: '2022-06-02'

  const options = {
    method: 'GET',
    url: 'https://covid-193.p.rapidapi.com/statistics',
    // params: {country: 'usa'},
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_CURRENT_API,
      'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }
  };

  const getCurrentData = async () => {
      let arr = []
    const response = await axios.request(options)
    setCurrentWorldData(response.data.response)
    setWorldStats(response.data.response.filter(function(el) {
        return (el.continent === 'All')
        }))
    for (let i=0; i<response.data.response.length; i++){
        arr.push(response.data.response[i].country)
    }
    setCountryArr(arr)
  }


  React.useEffect(function() {
    getCurrentData();
  },[])

  const handleContChange = (e) => {
    setContinent(e.target.value)
    console.log(e.target.value)
  }

  const handleCountryChange = (e) => {
    setCountry(e.target.value)
    console.log(e.target.value)
  }
  

  return (
    <div className="Current">
      
    <h1>World Cases</h1>
    <p>Total Cases: {worldStats.length>0 && worldStats[0].cases.total}</p>
    <p>Total Deaths: {worldStats.length>0 && worldStats[0].deaths.total}</p>

    <Dropdown 
        label = "Continent"
        arr = {contArr}
        value = {continent}
        onChange = {handleContChange}
    />

    {countryArr.length>0 && <Dropdown 
        label = "Country"
        arr = {countryArr}
        value = {country}
        onChange = {handleCountryChange}
    />}
    
    <Historical 
        continent = {continent}
        country = {country}
    />

    </div>
  );
}

export default Current;
