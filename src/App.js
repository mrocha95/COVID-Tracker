// import logo from './logo.svg';
import "./App.css";
import React from "react";
import Current from "./components.js/Current";
import { Chart } from "react-chartjs-2";
import News from "./components.js/News";

// import axios from 'axios'

function App() {
  return (
    <div className="App">
      <Current />

      <News />
    </div>
  );
}

export default App;
