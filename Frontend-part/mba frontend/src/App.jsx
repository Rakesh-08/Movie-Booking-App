import { useState } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthComponent from './components/authComponent'

function App() {
 
  return (
    <BrowserRouter>
      
      <Routes>
          <Route path="/Login" element={<AuthComponent/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
