import React, { useState } from "react";
import "./contact.scss";

const Contact = () => {
  const [message, setMessage] = useState(false);
  
  
  const handleSubmit = (e) =>{
      e.preventDefault();
      setMessage(true)
      document.getElementById("myForm").reset();
  };

  return (
    <div className="contact" id="contact">
      <div className="left">
        <h3>Address</h3>
        <p><span>Lorem@freeshop.com</span></p>
        <p>Tel : +12326485151818</p>
        <p>Mahdia, 5799, avenue bourguiba, tunisia</p>
      </div>
      <div className="right">
        <form id='myForm' onSubmit={handleSubmit}>
          <h3>contact us</h3>
          <div className="inputBox">
            <input type="text" placeholder="your name" required />
            <input type="email" placeholder="your email" required />
          </div>
          <div className="inputBox">
            <input type="number" placeholder="your number" required />
            <input type="text" placeholder="subject" required />
          </div>
          <textarea
            name=""
            placeholder="your message"
            cols="30"
            rows="10"
            required
          ></textarea>
          <button className="btnSend">send message</button>
          {message && <span>Thanks I'll reply ASAP :) </span> }
        </form>
      </div>
    </div>
  )
};

export default Contact;
