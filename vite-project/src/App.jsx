import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Outputjson from "../Outputjson";
import { parse } from "postcss";
import ApikeyPrompt from "./component/ApikeyPrompt";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./component/HomePage";
import {ChaiGlass} from "./component/chaiCup.jsx";
import AnalyticsDashboard from "./component/anaylatics";

const LangFlow = () => {};

function App() {
  //       console.log(Outputjson)
  // const data = JSON.stringify(Outputjson)

  return (
    <>
      <Router>
        <Routes>
        <Route exact path="/" element={<ApikeyPrompt />} />
        <Route path="/HomePage/*" element={<HomePage />} /> {/* Add trailing /* */}
        <Route path="/ChaiCup" element={<ChaiGlass />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
