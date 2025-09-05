import React, { useState, useRef, useEffect } from "react";
import "../App.css";
import SplashScreen from "../components/SplashScreen";
import Toolbar from "../components/Toolbar";
import GameArea from "../components/GameArea";
import PreviousMoves from "../components/PreviousMoves";

function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [history, setHistory] = useState([]);
  const chessRef = useRef(null);
  

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;

  return (
    <div className="main-screen">
      {/* Toolbar artık sadece chessRef prop’unu alıyor, ref yok */}
      <Toolbar onReset={() => chessRef.current?.resetGame()} onUndo={() => chessRef.current?.undoMove()} />
      <GameArea chessRef={chessRef} setHistory={setHistory} />
      <PreviousMoves history={history} />
    </div>
  );
}

export default Home;
