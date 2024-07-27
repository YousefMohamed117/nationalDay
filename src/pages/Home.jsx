import React, { useEffect, useState } from "react";
import { projectFirestore, timeStamps } from "../firebase/config"; // Ensure this path is correct
import { useNavigate } from "react-router";

const generateRandomKeyframes = (index) => {
  const randomX = Math.floor(Math.random() * 100 - 50); // Random integer value between -100 and 100
  const randomY = Math.floor(Math.random() * 100 - 50); // Random integer value between -100 and 100

  return `
    @keyframes move${index} {
      0% { transform: translate(0, 0); }
      50% { transform: translate(${randomX}px, ${randomY}px); }
      100% { transform: translate(0, 0); }
    }
  `;
};

const Home = () => {
  const [texts, setTexts] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const querySnapshot = await projectFirestore
          .collection("texts")
          .orderBy("createdAt", "desc")
          .limit(8)
          .get();
        const fetchedTexts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTexts(fetchedTexts);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };

    fetchTexts();
  }, []);

  useEffect(() => {
    texts.forEach((text, index) => {
      const keyframes = generateRandomKeyframes(index);

      // Inject keyframes into the document's style sheet
      const styleSheet = document.styleSheets[0];
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    });
  }, [texts]);

  return (
    <div className="home">
      <img src="./logo.png" alt="" className="logo" />
      <>
        {texts.map((text, index) => {
          const style = {
            animation: `move${index} 5s infinite alternate ease-in-out`,
          };

          return (
            <div
              className="box"
              key={text.id}
              style={style}
              onClick={() => Navigate("/")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fa2 fas"
                viewBox="0 0 448 512"
              >
                <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
              </svg>
              <div className="text">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fa1 fas"
                  viewBox="0 0 448 512"
                >
                  <path d="M448 296c0 66.3-53.7 120-120 120h-8c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H320c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32 32 72zm-256 0c0 66.3-53.7 120-120 120H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H64c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32 32 72z" />
                </svg>
                <div>
                  <p>{text.message.slice(0, 100)}</p>
                  <p className="author">{text.author.slice(0, 30)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
};

export default Home;
