import React, { useState } from 'react';
import axios from 'axios';
import SERVER_URL from "../../config";
import "../styles/contact.css"

const inputFields = [
  { name: 'name', type: 'text', placeholder: 'Your name' },
  { name: 'email', type: 'email', placeholder: 'Your email' },
  { name: 'phone', type: 'tel', placeholder: 'Your phone' },
];

function Contact() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;

    try {
      const res = await axios.post(SERVER_URL+'/contact', {
        name,
        email,
        phone,
        message,
      });

      const data = res.data;

      if (!data) {
        console.log('Message not sent');
      } else {
        alert('Message sent');
        setUserData((prevData) => ({ ...prevData, message: '' }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="contact" id="contact">
      <h1 className="text-center text-6xl font-bold mb-10">
        <span >contact</span> us
      </h1>

      <div className="row">
        <form method="POST">

          {inputFields.map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              value={userData[field.name]}
              onChange={handleInputs}
              placeholder={field.placeholder}
              className="box"
            />
          ))}

          <textarea
            placeholder="Your message"
            name="message"
            value={userData.message}
            onChange={handleInputs}
            className="box"
            cols="30"
            rows="10"
          ></textarea>

          <input
            type="submit"
            value="Send message"
            onClick={sendMessage}
            className="btn bg-[#222831] text-[#eeeeee] hover:bg-[#00ADB5]"
          />
        </form>
      </div>
    </section>
  );
}

export default Contact;
