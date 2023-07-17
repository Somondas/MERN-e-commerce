import './App.css';
import Header from "./components/layouts/Header";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import WebFont from "webfontloader";
import React, { useEffect } from 'react';
import Footer from './components/layouts/Footer/Footer';
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Products/Products.js";
import Search from './components/Products/Search.js';
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
        <Route exact path='/' element={<Home />} />
        <Route exact path='/product/:id' element={<ProductDetails />} />
        <Route exact path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route exact path='/search' element={<Search />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
