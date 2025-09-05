// src/components/GameArea.jsx
import React from "react";
import ChessboardComponent from "./ChessboardComponent";
import AICoach from "./AICoach";
import SpeechBubble from "./SpeechBubble";

export default function GameArea({ chessRef, setHistory }) {
  return (
    <div className="game-area">
      <div className="board">
        <ChessboardComponent ref={chessRef} onHistoryChange={setHistory} />
      </div>
      <div className="ai-coach-area">
        <AICoach />
        <SpeechBubble />
      </div>
    </div>
  );
}
