import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import ChessboardComponent from "../components/ChessboardComponent";

function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const chessRef = useRef(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

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
        <button>Hint</button>
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
          <h1>ai coach</h1>
        </div>
      </div>

      <div className="scrollable-bar">
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
