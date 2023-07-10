import './App.css';
import Header from "./components/layouts/Header";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import WebFont from "webfontloader";
import React, { useEffect } from 'react';
import Footer from './components/layouts/Footer/Footer';
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails";
function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, [])

  return (
    <Router>
      <Header />
      <Routes>
        <Route extact path='/' element={<Home />} />
        <Route extact path='/product/:id' element={<ProductDetails />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
