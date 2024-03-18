import React from 'react'
import { HashRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Home from "./Components/Home/Home";
import Exercises from './Components/Exercises/Exercises';
import "./App.css"
const App = () => {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/exercises' element={<Exercises />} />
        </Routes>
    </Router>
  )
}

export default App
