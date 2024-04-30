import React from 'react'
import "./ecommerce.css";


function Contact() {
  return (
    <div className='contactform'>
       <label for="name">Name:</label>
            <input type="text" id="name" name="name" required></input>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required></input>
            <label for="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" required></input>
            <label for="message">Message:</label>
            <textarea id="message" name="message" rows="5" required></textarea>

            <button type="submit">Submit</button>
    </div>
  )
}

export default Contact