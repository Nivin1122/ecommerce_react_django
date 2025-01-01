import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './components/Auth/Signup';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />}/>
          <Route path="/home" element={<Home />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
