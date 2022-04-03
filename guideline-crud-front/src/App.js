import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CodingPaperList from "./components/CodingPaperList";
import AddGuideline from "./components/AddCodingPaper";
import Guideline from "./components/CodingPaper";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/codingpapers" className="navbar-brand">
          codingPaper-Crud
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/codingpapers"} className="nav-link">
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
          <Route exact path="/" element={<CodingPaperList/>} />
          <Route exact path="/codingpapers" element={<CodingPaperList/>} />
          <Route exact path="/add" element={<AddGuideline/>} />
          <Route path="/codingpapers/:id" element={<AddGuideline/>} />
        </Routes>
      </div>
    </div>
  );
}
export default App;