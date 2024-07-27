import React, { useState } from "react";
import { projectFirestore, timeStamps } from "../firebase/config"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";

const FormPage = () => {
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  const Navigate = useNavigate();
  const createdAt = timeStamps.fromDate(new Date());
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = await projectFirestore.collection("texts").add({
        message: message.trim(), // Ensure message is trimmed
        author: author.trim(), // Ensure author is trimmed
        createdAt,
      });
      console.log("Document written with ID: ", docRef.id);
      // Optionally, reset the form
      setMessage("");
      setAuthor("");
      Navigate("/display");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="main">
      <img src="./logo.png" alt="" className="logo" />
      <div className="container">
        <div className="text">عبر عن حبك للوطن</div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-data textarea ">
              <textarea
                rows="4" // Adjust rows as needed
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                maxLength={100}
                placeholder="اقصى حد هو 100 حرف"
              ></textarea>
              <label>اكتب رسالتك</label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data">
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                maxLength={30}
              />
              <div className="underline"></div>
              <label>اسمك</label>
            </div>
          </div>
          <div className="form-row submit-btn">
            <div className="input-data">
              <div className="inner"></div>
              <input type="submit" value="ارسل" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
