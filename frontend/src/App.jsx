import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Protected_Route from './components/Auth/Protected_Route';
import AdminLogin from './components/Auth/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AddProduct from './pages/AddProduct';
import UserListing from './pages/UserListing';
// import './index.css'

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
          <Route path='/admin/add_products/' element={<AddProduct />} />
          <Route path="/admin/users" element={<UserListing />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
