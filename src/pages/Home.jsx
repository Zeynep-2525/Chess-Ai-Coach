import React, { useState, useRef, useEffect } from "react";
import "../App.css";
import SplashScreen from "../components/SplashScreen";
import Toolbar from "../components/Toolbar";
import ChessboardComponent from "../components/ChessboardComponent";
import PreviousMoves from "../components/PreviousMoves";
import SpeechBubble from "../components/SpeechBubble";
import OpeningsPanel from "../components/OpeningsPanel";
import avatar from "../images/avataaars.png";

function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [history, setHistory] = useState([]);
  const [hint, setHint] = useState(null);
  const [selectedOpening, setSelectedOpening] = useState(null);
  const chessRef = useRef(null);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Prod-ready fetch için async handler
  const handleHint = async () => {
    if (!chessRef.current) return;
    const chessHistory = chessRef.current.getHistory();
    const game = chessRef.current.getGame();
    const fen = chessHistory.length ? chessHistory[chessHistory.length - 1].fen : game.fen();

    try {
      const response = await fetch("https://chess-ai-coach.onrender.com/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fen }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setHint(data.hint || "No hint available.");
    } catch (error) {
      console.error("Hint alırken hata:", error);
      setHint("Hint alınamadı. Lütfen tekrar deneyin.");
    }
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className={`main-screen ${theme}`} style={{ overflow: "visible" }}>
      {/* Toolbar */}
      <Toolbar
        onReset={() => chessRef.current?.resetGame()}
        onUndo={() => chessRef.current?.undoMove()}
        onHint={handleHint}
        onToggleTheme={() => setTheme(prev => (prev === "dark" ? "light" : "dark"))}
        onSelectOpening={setSelectedOpening}
      />

      {/* Oyun ve AI */}
      <div
        className="game-area"
        style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "16px" }}
      >
        <div className="board-container">
          <ChessboardComponent ref={chessRef} onHistoryChange={setHistory} />
        </div>

        <div className="ai-coach">
          <SpeechBubble hintText={hint} />
          <img src={avatar} alt="avatar" className="image" />
        </div>
      </div>

      {/* Önceki hamleler */}
      <PreviousMoves history={history} />

      {/* Seçilen açılış paneli */}
      {selectedOpening && (
        <div className="openings-panel" style={{ marginTop: "20px" }}>
          <OpeningsPanel selectedOpening={selectedOpening} />
        </div>
      )}
    </div>
  );
}

export default Home;
