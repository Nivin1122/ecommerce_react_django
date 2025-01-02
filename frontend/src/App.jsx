import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Protected_Route from './components/Auth/Protected_Route';
import AdminLogin from './components/Auth/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />}/>
          <Route path="/home" element={
            <Protected_Route>
              <Home />
            </Protected_Route>}/>
          <Route path="/login" element={<Login />}/>
          
          <Route path='/admin/dashboard' element={<AdminDashboard />}/>
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
