import { useState } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthComponent from './pages/loginPage'
import ErrorPage from "./pages/ErrorPage";
import HomeComponent from './pages/landingPage';
import AdminPage from './pages/adminPage';
import ClientPage from './pages/clientPage';
import MovieDetails from './pages/MovieDetailsPage';
import AllMoviesListByLang from './pages/AllMoviesListByLanguage';
import BookingPage from './pages/bookingPage';
import PaymentPage from './pages/payment';

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<AuthComponent />}></Route>
        <Route path="/" element={<HomeComponent/>}></Route>
        <Route path="/Error" element={<ErrorPage />}></Route>
        <Route path="/ADMIN" element={<AdminPage />}></Route>
        <Route path="/CLIENT" element={<ClientPage />}></Route>
        <Route path="/Movie/Details" element={<MovieDetails />}></Route>
        <Route path="/Movie/booking" element={<BookingPage />}></Route>
        <Route path="/payment" element={<PaymentPage/>}></Route>
        <Route path="/Movies" element={<AllMoviesListByLang/> }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
