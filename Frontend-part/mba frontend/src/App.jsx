import { useState } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthComponent from './components/authComponent'
import ErrorPage from './ErrorPage';
import HomeComponent from './components/homeComponent';
import AdminPage from './components/adminPage';
import ClientPage from './components/clientPage';

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<AuthComponent />}></Route>
        <Route path="/" element={<HomeComponent/>}></Route>
        <Route path="/Error" element={<ErrorPage />}></Route>
        <Route path="/ADMIN" element={<AdminPage />}></Route>
        <Route path="/CLIENT" element={<ClientPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
