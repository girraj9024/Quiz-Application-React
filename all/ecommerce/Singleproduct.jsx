
import React, { useEffect, useState } from 'react'
import {Link, useParams} from "react-router-dom"
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import "./ecommerce.css";



function Singleproduct(props) {
  const [products, setProducts] = useState([]);
    const {id}=useParams()

    useEffect(() => {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result)/'mm;
          setProducts([... products ,result]);
        });
    }, []);
  
    console.log(props.cart)

    return (
      <div className="products">
          {products.map((product, index) => {
            const isInCart = props.cart.some(item => item.id === product.id);
            return (
              <div className="product" key={index}>
               <Link to={`/singleproduct/${product.id}`}>
                  <img src={product.image} alt="Product Image" />
               </Link>
                <h3>
                  <Link to={`/singleProduct/${product.id}`}>
                    {product.title}
                  </Link>
                </h3>
                <p> <CurrencyRupeeIcon /> {product.price}</p>
                <button onClick={(e) => props.handleAddToCart(e, product)}>
                {isInCart ? 'Remove From Cart' : 'Add To Cart'}
              </button>
              </div>
            );
          })}
        </div>
    )
  
}

export default Singleproduct;