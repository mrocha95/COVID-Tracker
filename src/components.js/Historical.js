import React from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

function Historical(props) {
  const [histCases, setHistCases] = React.useState([]);
  const [histDeaths, setHistDeaths] = React.useState([]);
  const [histNewCases, setHistNewCases] = React.useState([]);
  const [histNewDeaths, setHistNewDeaths] = React.useState([]);
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
    let newDeaths = [];
    let dates = [];
    const response = await axios.request(options);
    if (response.data.response.length > 2000) {
      for (let i = response.data.response.length - 1; i > 0; i -= 100) {
        cases.push(response.data.response[i].cases.total);
        deaths.push(response.data.response[i].deaths.total);
        newCases.push(response.data.response[i].cases.new);
        newDeaths.push(response.data.response[i].deaths.new);
        dates.push(response.data.response[i].day);
      }
    } else {
      for (let i = response.data.response.length - 1; i > 0; i -= 1) {
        cases.push(response.data.response[i].cases.total);
        deaths.push(response.data.response[i].deaths.total);
        newCases.push(response.data.response[i].cases.new);
        newDeaths.push(response.data.response[i].deaths.new);
        dates.push(response.data.response[i].day);
      }
    }
    setHistCases(cases);
    setHistDeaths(deaths);
    setHistNewCases(newCases);
    setHistNewDeaths(newDeaths);
    setDates(dates);
  };

  React.useEffect(
    function () {
      getHistData();
    },
    [props]
  );

  const lineChartCasesAndDeaths = {
    labels: dates,
    datasets: [
      {
        data: histCases,
        label: "Cases",
        yAxisID: "Cases",
        backgroundColor: "#3333ff",
        fill: true,
        lineTension: 0.5,
      },
      {
        data: histDeaths,
        label: "Deaths",
        yAxisID: "Deaths",
        backgroundColor: "#ff3333",
        fill: true,
        lineTension: 0.5,
      },
    ],
  };

  const lineChartNewCases = {
    labels: dates,
    datasets: [
      {
        data: histNewCases,
        label: "New Cases",
        yAxisID: "NewCases",
        backgroundColor: "#3333ff",
        fill: true,
        lineTension: 0.5,
      },
    ],
  };
  const lineChartNewDeaths = {
    labels: dates,
    datasets: [
      {
        data: histNewDeaths,
        label: "New Deaths",
        yAxisID: "NewDeaths",
        backgroundColor: "#ff3333",
        fill: true,
        lineTension: 0.5,
      },
    ],
  };

  return (
    <div className="Historical">
      <Bar
        className="chart"
        type="bar"
        options={{
          plugins: {
            title: {
              display: true,
              text: "New Cases",
              fontSize: 20,
            },
            legend: {
              display: false,
            },
          },
          scales: {
            xAxes: {
              grid: { display: false },
              ticks: {
                autoSkip: true,
                autoSkipPadding: 5,
              },
            },
            NewCases: {
              type: "linear",
              position: "left",
              ticks: {
                beginAtZero: true,
                color: "#3333ff",
              },
            },
          },
        }}
        data={lineChartNewCases}
      />
      <Bar
        className="chart"
        type="bar"
        options={{
          plugins: {
            title: {
              display: true,
              text: "Total Cases and Deaths",
              fontSize: 20,
            },
          },
          scales: {
            xAxes: {
              grid: { display: false },
              ticks: {
                autoSkip: true,
                autoSkipPadding: 5,
              },
            },
            Cases: {
              title: true,
              type: "linear",
              position: "left",
              ticks: { beginAtZero: true, color: "#3333ff" },
            },
            Deaths: {
              type: "linear",
              position: "right",
              ticks: {
                beginAtZero: true,
                color: "#ff3333",
              },
              grid: { display: false },
            },
          },
        }}
        data={lineChartCasesAndDeaths}
      />
      <Bar
        className="chart"
        type="bar"
        options={{
          plugins: {
            title: {
              display: true,
              text: "New Deaths",
              fontSize: 20,
            },
            legend: {
              display: false,
            },
          },
          scales: {
            xAxes: {
              grid: { display: false },
              ticks: {
                autoSkip: true,
                autoSkipPadding: 5,
              },
            },
            NewDeaths: {
              type: "linear",
              position: "left",
              ticks: { beginAtZero: true, color: "#ff3333" },
            },
          },
        }}
        data={lineChartNewDeaths}
      />
    </div>
  );
}

export default Historical;
