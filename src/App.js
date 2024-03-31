import React from 'react'
import { HashRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Home from "./Components/Home/Home";
import Exercises from './Components/Exercises/Exercises';
import Exercise from './Components/Exercise/Exercise';
import "./App.css"
const App = () => {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='exercises' element={<Exercises />} />
          <Route path='exercises/:id' element={<Exercise />} />
        </Routes>
    </Router>
  )
}

export default App
