import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import GuidelineList from "./components/CodingPaperList";
import AddGuideline from "./components/AddCodingPaper";
import Guideline from "./components/CodingPaper";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/guidelines" className="navbar-brand">
          codingPaper-Crud
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/guidelines"} className="nav-link">
              Coding Papers
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route exact path="/" element={<GuidelineList/>} />
          <Route exact path="/guidelines" element={<GuidelineList/>} />
          <Route exact path="/add" element={<AddGuideline/>} />
          <Route path="/guidelines/:id" element={<Guideline/>} />
        </Routes>
      </div>
    </div>
  );
}
export default App;