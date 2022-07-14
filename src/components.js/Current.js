import React from "react";
import axios from "axios";
import Dropdown from "./Dropdown";
import Historical from "./Historical";

function Current() {
  const [allData, setAllData] = React.useState([]);

  const [contArr, setContArr] = React.useState(["All"]);
  const [continent, setContinent] = React.useState("");

  const [countryArr, setCountryArr] = React.useState(["All"]);
  const [country, setCountry] = React.useState([]);

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
    setCountry(
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
    let countries = [];
    setContinent(e.target.value);
    if (e.target.value === "All") {
      for (let i = 0; i < allData.length; i++) {
        countries.push(allData[i].country);
      }
      countries.splice(countries.indexOf("All"), 1);
      countries.splice(countries.indexOf("Africa"), 1);
      countries.splice(countries.indexOf("Asia"), 1);
      countries.splice(countries.indexOf("Oceania"), 1);
      countries.splice(countries.indexOf("North-America"), 1);
      countries.splice(countries.indexOf("South-America"), 1);
      countries.splice(countries.indexOf("Europe"), 1);
      countries.sort();
      setCountryArr(["All"].concat(countries));
    } else {
      let filteredCountries = allData.filter(function (data) {
        return data.continent === e.target.value;
      });
      let countryNames = filteredCountries.map((el) => el.country);
      setCountryArr(countryNames);
    }
  };

  const handleCountryChange = (e) => {
    setCountry(
      allData.filter(function (el) {
        return e.target.value === el.country;
      })
    );
  };

  return (
    <div className="Current">
      <header>
        <h1>COVID-19: {country.length > 0 && country[0].country}</h1>
        <div className="counter">
          <h3>
            <b>Total Cases: </b>
            {country.length > 0 && country[0].cases.total.toLocaleString()}
          </h3>
          <h3>
            <b>Total Deaths: </b>
            {country.length > 0 && country[0].deaths.total.toLocaleString()}
          </h3>
        </div>
        <div className="Filter">
          <div>
            {contArr.length > 0 && (
              <Dropdown
                key={continent}
                label="Continent: "
                arr={contArr}
                value={continent}
                onChange={handleContChange}
              />
            )}
          </div>

          <div>
            {countryArr.length > 0 && (
              <Dropdown
                key={country.country}
                label="Country: "
                arr={countryArr}
                value={country.country}
                onChange={handleCountryChange}
              />
            )}
          </div>
        </div>
      </header>
      {country.length > 0 && (
        <Historical key={country[0].country} country={country[0].country} />
      )}
    </div>
  );
}

export default Current;
