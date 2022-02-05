import React, { useState } from "react";
import "./contact.scss";
import Iframe from 'react-iframe'

const Contact = () => {
  const [message, setMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(true);
    document.getElementById("myForm").reset();
  };

  return (
    <>
    <div className="contact" id="contact">
      <div className="left">
        <h3>Address</h3>
        <p>
          <span>Lorem@freeshop.com</span>
        </p>
        <p>Tel : +12326485151818</p>
        <p>Mahdia, 5799, avenue bourguiba, tunisia</p>
      </div>
      <div className="right">
        <form id="myForm" onSubmit={handleSubmit}>
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
          {message && <span>Thanks I'll reply ASAP :) </span>}
        </form>
      </div>
    </div>
     <Iframe
       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3248.200529639181!2d11.060427714599482!3d35.49931944753577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130223fb7597110d%3A0xc173e018a02c804f!2sMahdia%20Zone%20Touristique!5e0!3m2!1sfr!2stn!4v1643760648094!5m2!1sfr!2stn"
       width="900"
       height="250"
       allowfullscreen=""
       loading="eager"
       id="map_adress"
     />
     </>
  );
};

export default Contact;
