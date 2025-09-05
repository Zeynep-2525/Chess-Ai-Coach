// src/components/ChessboardComponent.jsx
import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const ChessboardComponent = forwardRef((props, ref) => {
  const [game, setGame] = useState(new Chess());

  // Ref ile dışarıya metodlar expose ediyoruz
  useImperativeHandle(ref, () => ({
    resetGame,
    undoMove,
    getHistory: () => props.history || [],
  }));

  // Reset game
  function resetGame() {
    setGame(new Chess());
    if (props.onHistoryChange) props.onHistoryChange([]); // Parent history sıfırlanır
  }

  // Undo move
  function undoMove() {
    const move = game.undo();
    if (!move) return;

    setGame(new Chess(game.fen()));
    if (props.onHistoryChange) {
      props.onHistoryChange(prevHistory => prevHistory.slice(0, -1));
    }
  }

  // Taş bırakıldığında
  function onDrop(sourceSquare, targetSquare, piece) {
    const gameCopy = new Chess(game.fen());

    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      if (!move) return false;

      setGame(gameCopy);

      // Parent history’i güncelle
      if (props.onHistoryChange) {
        props.onHistoryChange(prevHistory => [
          ...prevHistory,
          { from: sourceSquare, to: targetSquare, san: move.san },
        ]);
      }

      return true;
    } catch (error) {
      console.error("Hamle hatası:", error);
      return false;
    }
  }

  // Component mount olduğunda Chess.js testi
  useEffect(() => {
    console.log("ChessboardComponent mounted");
    console.log("Chess.js version:", Chess.version || "version bilgisi yok");
    console.log("Initial game position:", game.fen());
  }, []);

  return (
    <div className="chess-container">
      <Chessboard
        position={game.fen()}
        onPieceDrop={onDrop}
        onPieceDragBegin={(piece, sourceSquare) =>
          console.log(`Taş alındı: ${piece} from ${sourceSquare}`)
        }
        onPieceDragEnd={(piece, sourceSquare) =>
          console.log(`Taş bırakıldı: ${piece} from ${sourceSquare}`)
        }
        boardOrientation="white"
        boardWidth={560}
        animationDuration={200}
        arePiecesDraggable={true}
        arePremovesAllowed={false}
        snapToCursor={true}
      />
    </div>
  );
});

export default ChessboardComponent;
