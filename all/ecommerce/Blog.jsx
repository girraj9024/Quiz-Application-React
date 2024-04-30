import React, { useEffect, useState } from 'react'
import "./ecommerce.css";
import {Link, Outlet}from "react-router-dom"


function Blog() {
  // const [Data, setData] = useState([]);
    
  const [blogs, setblogs] = useState([]);
  useEffect(()=> {
      fetch(`https://jsonplaceholder.typicode.com/posts`)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setblogs(result);
        });
      }, []);

      return (
        <div className="blog">
            {blogs.map((blogs, index) => {
              return (
                <div className="blogclass" key={index}>
                  <h2> <Link to={`${blogs.id}`}>{blogs.title}</Link></h2>
                  <p>{blogs.body}</p>
                </div>
              );
            })}
          </div>
      )
}

export default Blog