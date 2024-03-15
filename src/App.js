import React from 'react'
import { HashRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Box } from '@mui/material'
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import Home from './Pages/Home'
import ExerciseDetail from "./Pages/ExerciseDetail"
import "./App.css"
const App = () => {
  return (
    <Router>
      <Box width="400px" sx={{width: {xl: "1488px"}}}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='exercise/:id' element={<ExerciseDetail />}/>
        </Routes>
        <Footer />
      </Box>
    </Router>
  )
}

export default App
