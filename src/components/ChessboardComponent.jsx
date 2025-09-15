import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import moveSoundFile from "../assets/sounds/move.mp3";

const ChessboardComponent = forwardRef((props, ref) => {
  const [game, setGame] = useState(new Chess());
  const [history, setHistory] = useState([]);
  const [whiteScore, setWhiteScore] = useState(0);
  const [blackScore, setBlackScore] = useState(0);

  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef(null);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  const moveSound = new Audio(moveSoundFile);

  useImperativeHandle(ref, () => ({
    resetGame,
    undoMove,
    getHistory: () => history,
    getFen: () => game.fen(),
    getGame: () => game,
  }));

  // Timer
  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => setTime((prev) => prev + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerActive]);

  function resetGame() {
    const newGame = new Chess();
    setGame(newGame);
    setHistory([]);
    setWhiteScore(0);
    setBlackScore(0);
    setTime(0);
    setTimerActive(false);
    if (props.onHistoryChange) props.onHistoryChange([]);
  }

  function undoMove() {
    if (history.length === 0) return;

    let targetFen;
    let newHistoryLength;

    if (game.turn() === "w" && history.length >= 2) {
      targetFen = history[history.length - 3]?.fen || new Chess().fen();
      newHistoryLength = history.length - 2;
    } else {
      targetFen = history[history.length - 2]?.fen || new Chess().fen();
      newHistoryLength = history.length - 1;
    }

    const newGame = new Chess(targetFen);
    setGame(newGame);
    setHistory((prev) => {
      const newHistory = prev.slice(0, newHistoryLength);
      if (props.onHistoryChange) props.onHistoryChange(newHistory);
      return newHistory;
    });
    recalcScores(newGame);
  }

  function updateScoresForMove(move) {
    if (!move.captured) return;
    const pieceValues = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
    const value = pieceValues[move.captured.toLowerCase()] || 0;
    if (move.color === "w") setWhiteScore((prev) => prev + value);
    else setBlackScore((prev) => prev + value);
  }

  function recalcScores(gameObj) {
    const moves = gameObj.history({ verbose: true });
    let wScore = 0,
      bScore = 0;
    const pieceValues = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
    moves.forEach((move) => {
      if (move.captured) {
        if (move.color === "w") wScore += pieceValues[move.captured.toLowerCase()] || 0;
        else bScore += pieceValues[move.captured.toLowerCase()] || 0;
      }
    });
    setWhiteScore(wScore);
    setBlackScore(bScore);
  }

  function evaluateMove(move) {
    const pieceValues = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
    let score = 0;
    if (move.captured) score += pieceValues[move.captured.toLowerCase()] + 5;
    const centerSquares = ["d4", "d5", "e4", "e5"];
    if (centerSquares.includes(move.to)) score += 1;
    const developmentSquares = ["b1", "g1", "b8", "g8"];
    if (developmentSquares.includes(move.from)) score += 0.5;
    return score;
  }

  function onDrop(source, target) {
    const gameCopy = new Chess(game.fen());
    const move = gameCopy.move({ from: source, to: target, promotion: "q" });
    if (!move) return false;

    setGame(gameCopy);
    setHistory((prev) => {
      const newHistory = [
        ...prev,
        { from: source, to: target, san: move.san, fen: gameCopy.fen() },
      ];
      if (props.onHistoryChange) props.onHistoryChange(newHistory);

      moveSound.currentTime = 0;
      moveSound.play();

      return newHistory;
    });
    updateScoresForMove(move);

    if (!timerActive && history.length === 0) setTimerActive(true);

    return true;
  }

  function aiMove() {
    if (game.turn() === "w" || game.isGameOver()) return;

    const gameCopy = new Chess(game.fen());
    const moves = gameCopy.moves({ verbose: true });
    if (moves.length === 0) return;

    let bestScore = -Infinity;
    let bestMoves = [];

    moves.forEach((move) => {
      const score = evaluateMove(move);
      if (score > bestScore) bestMoves = [move], (bestScore = score);
      else if (score === bestScore) bestMoves.push(move);
    });

    const selectedMove = bestMoves[Math.floor(Math.random() * bestMoves.length)];
    const moveResult = gameCopy.move(selectedMove.san);

    if (moveResult) {
      setGame(gameCopy);
      setHistory((prev) => {
        const newHistory = [
          ...prev,
          { from: selectedMove.from, to: selectedMove.to, san: moveResult.san, fen: gameCopy.fen() },
        ];
        if (props.onHistoryChange) props.onHistoryChange(newHistory);

        moveSound.currentTime = 0;
        moveSound.play();

        return newHistory;
      });
      updateScoresForMove(moveResult);
    }
  }

  function checkGameOver(gameObj) {
    if (gameObj.isCheckmate()) {
      const winner = gameObj.turn() === "w" ? "Black" : "White";
      setTimeout(() => alert(`Oyun bitti! Kazanan: ${winner}`), 100);
    } else if (gameObj.isStalemate() || gameObj.isDraw()) {
      setTimeout(() => alert("Oyun berabere."), 100);
    }
  }

  useEffect(() => {
    const shouldAiMove = history.length > 0 && game.turn() === "b";
    if (shouldAiMove && !game.isGameOver()) {
      const timer = setTimeout(() => aiMove(), 500);
      return () => clearTimeout(timer);
    }
  }, [history.length]);

  return (
    <div>
      <div className="chess-container">
        <Chessboard
          position={game.fen()}
          onPieceDrop={onDrop}
          boardOrientation="white"
          animationDuration={200}
          arePiecesDraggable={true}
          arePremovesAllowed={false}
          snapToCursor={true}
          customBoardStyle={{
            width: "100%",
            maxWidth: "560px",
            aspectRatio: "1 / 1",
          }}
        />
      </div>

      <div
        className="game-info"
        style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}
      >
        <div className="scoreboard">
          Puanlar - White: {whiteScore} | Black: {blackScore}
          <br />
          <small>
            Turn: {game.turn()}, Moves: {history.length}
          </small>
        </div>
        <div className="timer" style={{ cursor: "pointer" }} onClick={() => setTimerActive((prev) => !prev)}>
          {formattedTime}
        </div>
      </div>
    </div>
  );
});

export default ChessboardComponent;
