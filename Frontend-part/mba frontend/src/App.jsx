import { useState } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthComponent from './components/authComponent'
import ErrorPage from './ErrorPage';
import HomeComponent from './components/homeComponent';

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<AuthComponent />}></Route>
        <Route path="/" element={<HomeComponent/>}></Route>
        <Route path="/Error" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
