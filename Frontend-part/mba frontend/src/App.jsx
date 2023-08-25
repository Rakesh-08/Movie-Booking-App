import { useState } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthComponent from './components/authComponent'

function App() {
 
  return (
    <BrowserRouter>
      
      <Router>
          <Route path="/Login" element={<AuthComponent/>}></Route>
      </Router>
    </BrowserRouter>
  )
}

export default App
