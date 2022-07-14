import "./App.css";
import React from "react";
import Current from "./components.js/Current";
import News from "./components.js/News";

function App() {
  return (
    <div className="App">
      <Current />

      <News />
    </div>
  );
}

export default App;
