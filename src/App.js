import { useState } from 'react';
import './App.css';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path='/:company/*' element={<MainPage/>}/>
      </Routes>
    </BrowserRouter>
      
    </div> 
  );
}

export default App;
