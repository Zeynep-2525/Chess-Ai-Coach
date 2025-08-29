import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import ChessboardComponent from "../components/ChessboardComponent";

function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const chessRef = useRef(null); // ChessboardComponent'e ref

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
        <button onClick={() => chessRef.current && chessRef.current.resetGame()}>
          Reset
        </button>
        <button onClick={() => chessRef.current && chessRef.current.undoMove()}>Undo</button>
      </div>

      <div className="game-area">
        <div className="board">
          <div className="chess-container">
            <ChessboardComponent ref={chessRef} />
          </div>
        </div>

        <div className="ai-coach">
          <h1>ai coach</h1>
        </div>
      </div>

      
      <div className="scrollable-bar">
        <div className="move">e4</div>
        <div className="move">e5</div>
        <div className="move">Nf3</div>
        <div className="move">Nc6</div>
        <div className="move">Bb5</div>
        <div className="move">a6</div>
        <div className="move">Ba4</div>
        <div className="move">Nf6</div>
        <div className="move">O-O</div>
        <div className="move">Be7</div>
        <div className="move">e4</div>
        <div className="move">e5</div>
        <div className="move">Nf3</div>
        <div className="move">Nc6</div>
        <div className="move">Bb5</div>
        <div className="move">a6</div>
        <div className="move">Ba4</div>
        <div className="move">Nf6</div>
        <div className="move">O-O</div>
        <div className="move">Be7</div><div className="move">e4</div>
        <div className="move">e5</div>
        <div className="move">Nf3</div>
        <div className="move">Nc6</div>
        <div className="move">Bb5</div>
        <div className="move">a6</div>
        <div className="move">Ba4</div>
        <div className="move">Nf6</div>
        <div className="move">O-O</div>
        <div className="move">Be7</div>
      </div>

    </div>
  );
}

export default Home;
