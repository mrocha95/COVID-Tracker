import React from "react";
import axios from "axios";
import Dropdown from "./Dropdown";
import Historical from "./Historical";

function Current() {
  const [allData, setAllData] = React.useState([]);

  const [worldStats, setWorldStats] = React.useState([]);

  const [contArr, setContArr] = React.useState(["Continents"]);
  const [continent, setContinent] = React.useState("");

  const [countryArr, setCountryArr] = React.useState(["Countries"]);
  const [country, setCountry] = React.useState("");

  const options = {
    method: "GET",
    url: "https://covid-193.p.rapidapi.com/statistics",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_CURRENT_API,
      "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
    },
  };

  const getCurrentData = async () => {
    let countries = [];
    let continents = [];
    const response = await axios.request(options);
    setAllData(response.data.response);
    setWorldStats(
      response.data.response.filter(function (el) {
        return el.continent === "All";
      })
    );
    for (let i = 0; i < response.data.response.length; i++) {
      countries.push(response.data.response[i].country);
    }
    countries.splice(countries.indexOf("All"), 1);
    countries.splice(countries.indexOf("Africa"), 1);
    countries.splice(countries.indexOf("Asia"), 1);
    countries.splice(countries.indexOf("Oceania"), 1);
    countries.splice(countries.indexOf("North-America"), 1);
    countries.splice(countries.indexOf("South-America"), 1);
    countries.splice(countries.indexOf("Europe"), 1);
    countries.sort();
    setCountryArr(countryArr.concat(countries));
    for (let i = 0; i < response.data.response.length; i++) {
      continents.push(response.data.response[i].continent);
    }
    let uniqueContinents = [...new Set(continents)];
    uniqueContinents.splice(uniqueContinents.indexOf(null), 1);
    uniqueContinents.splice(uniqueContinents.indexOf("All"), 1);
    uniqueContinents.sort();
    setContArr(contArr.concat(uniqueContinents));
  };

  React.useEffect(function () {
    getCurrentData();
  }, []);

  const handleContChange = (e) => {
    setContinent(e.target.value);
    let filteredCountries = allData.filter(function (data) {
      return data.continent === e.target.value;
    });
    let countryNames = filteredCountries.map((el) => el.country);
    setCountryArr(countryNames);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  return (
    <div className="Current">
      <h1>World Cases</h1>
      <p>Total Cases: {worldStats.length > 0 && worldStats[0].cases.total}</p>
      <p>Total Deaths: {worldStats.length > 0 && worldStats[0].deaths.total}</p>

      {contArr.length > 0 && (
        <Dropdown
          label="Continent"
          arr={contArr}
          value={continent}
          onChange={handleContChange}
        />
      )}

      {countryArr.length > 0 && (
        <Dropdown
          label="Country"
          arr={countryArr}
          value={country}
          onChange={handleCountryChange}
        />
      )}

      {country.length > 0 && (
        <Historical continent={continent} country={country} />
      )}
    </div>
  );
}

export default Current;
