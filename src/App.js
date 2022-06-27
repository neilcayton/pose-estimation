

import React from "react";

import Home from "./pages/Home";
// import ExercisePage from './pages/ExercisePageScratch'
import ExercisePage from './pages/ExercisePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home /> }/>
        <Route path="/:id" element={<ExercisePage/>} />
      </Routes>
    
    </Router>
  )
}

export default App;