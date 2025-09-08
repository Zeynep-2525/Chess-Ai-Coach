import React, { useState , useEffect } from "react";

const SpeechBubble = ({ hintText }) => {
  const [text, setText] = useState("Merhaba! Benimle satranç oynamaya hazır mısın?");

  useEffect(() => {
    const timer = setTimeout(() => {
      setText("Sizi yenebileceğimi düşünüyorum");
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hintText) {
      setText(hintText);
    }
  }, [hintText]);

  return (
    <div className="speech-bubble-container">
      <div className="speech-bubble">{text}</div>
    </div>
  );
};
export default SpeechBubble;