
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login'
// import Login from '../components/login';
 import Signup from './components/signup';
 import Home from './components/home';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;