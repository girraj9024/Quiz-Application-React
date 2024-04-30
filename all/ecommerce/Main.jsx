import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header';
import Home from "./Home";
import About from "./About";
import Blog from "./Blog";
import Contact from './Contact';
import Cart from "./Cart";
import Singleproduct from "./Singleproduct";
import SingleBlog from "./SingleBlog";
import BlogParent from "./BlogParent";
function Main(props) {
  const [cart, setCart] = useState([]);

  function handleAddToCart(e, product) {
    e.preventDefault();
    setCart([...cart, product]);
  }

  function handleRemoveToCart(e, product){
    e.preventDefault();
    setCart(
      cart.filter((cartitem)=>{
        return product.id !== cartitem.id;
      })
    );
  }

  function handleCartClearance(){
    setCart([]);
  }


  return (
    <>
      <BrowserRouter>
        <Header cartLength={cart.length} />
        <Routes>
          <Route path='/' element={<Home cart={cart} setCart={setCart} handleAddToCart={handleAddToCart} />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/blog' element={<BlogParent />}>
            <Route index element={<Blog />}></Route>
            <Route path=":id" element={<SingleBlog />} />
          </Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/SingleProduct/:id' element={<Singleproduct cart={cart} setCart={setCart} handleAddToCart={handleAddToCart} />}></Route>
          <Route path='/SingleProduct/:id' element={<Singleproduct cart={cart} setCart={setCart} handleRemoveToCart={handleRemoveToCart} />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Main;
