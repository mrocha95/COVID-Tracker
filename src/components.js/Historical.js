import React from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

function Historical(props) {
  const [histCases, setHistCases] = React.useState([]);
  const [histDeaths, setHistDeaths] = React.useState([]);
  const [histNewCases, setHistNewCases] = React.useState([]);
  const [dates, setDates] = React.useState([]);

  const options = {
    method: "GET",
    url: "https://covid-193.p.rapidapi.com/history",
    params: { country: props.country.toLowerCase() },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_HISTORICAL_API,
      "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
    },
  };

  const getHistData = async () => {
    let cases = [];
    let deaths = [];
    let newCases = [];
    let dates = [];
    const response = await axios.request(options);
    if (props.country === "USA") {
      for (let i = response.data.response.length - 1; i > 0; i -= 500) {
        // console.log(response.data.response[i]);
        cases.push(response.data.response[i].cases.total);
        deaths.push(response.data.response[i].deaths.total);
        newCases.push(response.data.response[i].cases.new);
        dates.push(response.data.response[i].day);
      }
    } else {
      for (let i = response.data.response.length - 1; i > 0; i -= 1) {
        // console.log(response.data.response[i]);
        cases.push(response.data.response[i].cases.total);
        deaths.push(response.data.response[i].deaths.total);
        newCases.push(response.data.response[i].cases.new);
        dates.push(response.data.response[i].day);
      }
    }
    setHistCases(cases);
    setHistDeaths(deaths);
    setHistNewCases(newCases);
    setDates(dates);
  };

  React.useEffect(
    function () {
      getHistData();
    },
    [props]
  );

  const lineChartCases = {
    labels: dates,
    datasets: [
      {
        data: histCases,
        label: "Cases",
      },
    ],
  };

  const lineChartDeaths = {
    labels: dates,
    datasets: [
      {
        data: histDeaths,
        label: "Deaths",
      },
    ],
  };
  const lineChartNewCases = {
    labels: dates,
    datasets: [
      {
        data: histNewCases,
        label: "New Cases",
      },
    ],
  };

  return (
    <div className="Historical">
      <Line
        className="chart"
        type="line"
        options={{
          title: {
            display: true,
            text: "Covid Cases",
          },
        }}
        data={lineChartCases}
      />
      <Line
        className="chart"
        type="line"
        options={{
          title: {
            display: true,
            text: "Covid Deaths",
          },
        }}
        data={lineChartDeaths}
      />
      <Line
        className="chart"
        type="line"
        options={{
          title: {
            display: true,
            text: "New Cases",
          },
        }}
        data={lineChartNewCases}
      />
    </div>
  );
}

export default Historical;
