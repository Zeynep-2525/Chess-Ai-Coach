import React, { useState, useRef, useEffect } from "react";
import "../App.css";
import SplashScreen from "../components/SplashScreen";
import Toolbar from "../components/Toolbar";
import ChessboardComponent from "../components/ChessboardComponent";
import PreviousMoves from "../components/PreviousMoves";
import SpeechBubble from "../components/SpeechBubble";
import avatar from "../images/avataaars.png";

function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [history, setHistory] = useState([]);
  const [hint, setHint] = useState(null);
  const chessRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;

  const handleHint = async () => {
    if (!chessRef.current) return;

    const history = chessRef.current.getHistory();
    const game = chessRef.current.getGame();
    const fen = history.length ? history[history.length - 1].fen : game.fen();

    try {
      const response = await fetch("http://127.0.0.1:8000/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fen }),
      });
      const data = await response.json();
      setHint(data.hint);
    } catch (error) {
      console.error("Hint alırken hata:", error);
    }
  };

  return (
    <div className="main-screen">
      <Toolbar
        onReset={() => chessRef.current?.resetGame()}
        onUndo={() => chessRef.current?.undoMove()}
        onHint={handleHint}
      />

      <div className="game-area">
        {/* Chess board sola */}
        <div className="board-container">
          <ChessboardComponent ref={chessRef} onHistoryChange={setHistory} />
        </div>

        {/* AI coach sağ üstte, balon solunda */}
        <div className="ai-coach">
          <SpeechBubble hintText={hint} />
          <img src={avatar} alt="avatar" className="image" />
        </div>
      </div>

      <PreviousMoves history={history} />
    </div>
  );
}

export default Home;
