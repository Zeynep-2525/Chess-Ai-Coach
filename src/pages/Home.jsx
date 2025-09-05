import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import ChessboardComponent from "../components/ChessboardComponent";
import avatar from "../images/avataaars.png";
import SpeechBubble from "../components/SpeechBubble";


function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const chessRef = useRef(null);
  const [history, setHistory] = useState([]);
  const scrollRef = useRef(null);
  const moveRef = useRef(null);
  const [hintText, setHintText] = useState("");
  const handleHintClick = () => {
    setHintText("apıden gelecek yazı burada gözükecek");
  }



  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000); //3 saniye yanıp sönen ekran
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {   //Bizim burada amacımız: hamleler her değiştiğinde scroll bar’ı en sağa çekmek.O yüzden useEffect’e [history] bağımlılığı verdik.
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth; //history güncellendikçe bar sona kayar
    }
  }, [history]);

  //scrollWidth:içeriğin toplam genişliği
  //scrollLeft:şu an yatayda kaç px kaydırılmış
  //scrollLeft = scrollWidth yaparsak otomatik en sağa kayar!!!!

  if (showSplash) {
    return (
      <div className="splash-screen">
        <h1 className="splash-title">Chess Uygulamasına Hoş Geldiniz...</h1>
      </div>
    );
  }

  return (
    <div className="main-screen">
      <div className="toolbar">
        <button className="hint-button">Hint</button>
        <button>Options</button>
        <button>Openings</button>
        <button onClick={() => chessRef.current && chessRef.current.resetGame()}>Reset</button>
        <button onClick={() => chessRef.current && chessRef.current.undoMove()}>Undo</button>
      </div>

      <div className="game-area">
        <div className="board">
          <div className="chess-container">
            <ChessboardComponent ref={chessRef} onHistoryChange={setHistory} />
          </div>
        </div>

        <div className="ai-coach">
          <div className="coach">
            <SpeechBubble hintText={hintText} />
            <img src={avatar} alt="avatar" className="image" />

          </div>

        </div>
      </div>

      <div className="scrollable-bar" ref={scrollRef}>
        {history.map((move, index) => (
          <div key={index} className="move">
            {move.from} → {move.to} ({move.san})
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
