import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const ChessboardComponent = forwardRef((props, ref) => {
  const [game, setGame] = useState(new Chess());
  const [history, setHistory] = useState([]);
  const [whiteScore, setWhiteScore] = useState(0);
  const [blackScore, setBlackScore] = useState(0);

  console.log("ChessboardComponent render - Turn:", game.turn(), "History length:", history.length);

  useImperativeHandle(ref, () => ({
    resetGame,
    undoMove,
    getHistory: () => history,
    getFen: () => game.fen(),
    getGame: () => game,
  }));

  function resetGame() {
    console.log("Reset game called");
    const newGame = new Chess();
    setGame(newGame);
    setHistory([]);
    setWhiteScore(0);
    setBlackScore(0);
    if (props.onHistoryChange) props.onHistoryChange([]);
  }

  function undoMove() {
    console.log("=== UNDO MOVE START ===");
    console.log("Current turn:", game.turn());
    console.log("History length:", history.length);
    console.log("Current FEN:", game.fen());
    
    // En az bir hamle yoksa çık
    if (history.length === 0) {
      console.log("No moves to undo");
      return;
    }
    
    let targetFen;
    let newHistoryLength;
    
    // Eğer şu an beyazın sırası ise, son hamle AI'nın hamlesi
    // İki hamle geri al: AI + Oyuncu
    if (game.turn() === 'w' && history.length >= 2) {
      console.log("Undoing 2 moves (AI + Player)");
      // 2 hamle önceki pozisyona git
      if (history.length >= 2) {
        targetFen = history[history.length - 3]?.fen || new Chess().fen(); // 3 hamle öncesi
        newHistoryLength = history.length - 2;
      } else {
        targetFen = new Chess().fen(); // Başlangıç pozisyonu
        newHistoryLength = 0;
      }
    } 
    // Eğer şu an siyahın sırası ise, sadece oyuncunun hamlesini geri al
    else {
      console.log("Undoing 1 move (Player only)");
      // 1 hamle önceki pozisyona git
      if (history.length >= 1) {
        targetFen = history[history.length - 2]?.fen || new Chess().fen(); // 2 hamle öncesi
        newHistoryLength = history.length - 1;
      } else {
        targetFen = new Chess().fen(); // Başlangıç pozisyonu
        newHistoryLength = 0;
      }
    }
    
    console.log("Target FEN:", targetFen);
    console.log("New history length will be:", newHistoryLength);
    
    // Yeni game instance'ı oluştur
    const newGame = new Chess(targetFen);
    console.log("Created newGame with target FEN:", newGame.fen());
    console.log("New game turn:", newGame.turn());
    
    // State'i güncelle
    setGame(newGame);
    
    setHistory(prev => {
      const newHistory = prev.slice(0, newHistoryLength);
      console.log("History updated from", prev.length, "to", newHistory.length);
      if (props.onHistoryChange) props.onHistoryChange(newHistory);
      return newHistory;
    });
    
    console.log("Recalculating scores...");
    recalcScores(newGame);
    console.log("=== UNDO MOVE END ===");
  }

  function updateScoresForMove(move) {
    if (!move.captured) return;
    const pieceValues = { p:1, n:3, b:3, r:5, q:9, k:0 };
    const value = pieceValues[move.captured.toLowerCase()] || 0;
    if (move.color === 'w') setWhiteScore(prev => prev + value);
    else setBlackScore(prev => prev + value);
  }

  function recalcScores(gameObj) {
    const moves = gameObj.history({ verbose: true });
    let wScore = 0, bScore = 0;
    const pieceValues = { p:1, n:3, b:3, r:5, q:9, k:0 };
    moves.forEach(move => {
      if (move.captured) {
        if (move.color === 'w') wScore += pieceValues[move.captured.toLowerCase()] || 0;
        else bScore += pieceValues[move.captured.toLowerCase()] || 0;
      }
    });
    setWhiteScore(wScore);
    setBlackScore(bScore);
  }

  function evaluateMove(move) {
    const pieceValues = { p:1, n:3, b:3, r:5, q:9, k:0 };
    let score = 0;
    if (move.captured) score += pieceValues[move.captured.toLowerCase()] + 5;
    const centerSquares = ["d4","d5","e4","e5"];
    if (centerSquares.includes(move.to)) score += 1;
    const developmentSquares = ["b1","g1","b8","g8"];
    if (developmentSquares.includes(move.from)) score += 0.5;
    return score;
  }

  // Basitleştirilmiş onDrop
  function onDrop(source, target) {
    console.log("onDrop called:", source, "to", target, "Current turn:", game.turn());
    
    try {
      const gameCopy = new Chess(game.fen());
      const move = gameCopy.move({ from: source, to: target, promotion: 'q' });
      
      if (!move) {
        console.log("Invalid move:", source, "to", target);
        return false;
      }
      
      console.log("Valid move made:", move.san);
      
      // State güncellemeleri
      setGame(gameCopy);
      setHistory(prev => {
        const newHistory = [...prev, { 
          from: source, 
          to: target, 
          san: move.san, 
          fen: gameCopy.fen() 
        }];
        console.log("History updated, new length:", newHistory.length);
        if (props.onHistoryChange) props.onHistoryChange(newHistory);
        return newHistory;
      });
      
      updateScoresForMove(move);
      checkGameOver(gameCopy);
      
      return true;
      
    } catch (error) {
      console.error("Error in onDrop:", error);
      return false;
    }
  }

  // Basitleştirilmiş aiMove
  function aiMove() {
    console.log("aiMove called, current turn:", game.turn());
    
    try {
      if (game.turn() === 'w') {
        console.log("AI won't move - it's white's turn");
        return;
      }

      if (game.isGameOver()) {
        console.log("AI won't move - game is over");
        return;
      }

      const gameCopy = new Chess(game.fen());
      const moves = gameCopy.moves({ verbose: true });
      
      if (moves.length === 0) {
        console.log("No moves available for AI");
        return;
      }

      // En iyi hamleyi seç
      let bestScore = -Infinity;
      let bestMoves = [];
      
      moves.forEach(move => {
        const score = evaluateMove(move);
        if (score > bestScore) {
          bestScore = score;
          bestMoves = [move];
        } else if (score === bestScore) {
          bestMoves.push(move);
        }
      });

      const selectedMove = bestMoves[Math.floor(Math.random() * bestMoves.length)];
      const moveResult = gameCopy.move(selectedMove.san);
      
      if (moveResult) {
        console.log("AI made move:", moveResult.san);
        
        setGame(gameCopy);
        setHistory(prev => {
          const newHistory = [...prev, { 
            from: selectedMove.from, 
            to: selectedMove.to, 
            san: moveResult.san, 
            fen: gameCopy.fen() 
          }];
          console.log("AI move - History updated, new length:", newHistory.length);
          if (props.onHistoryChange) props.onHistoryChange(newHistory);
          return newHistory;
        });
        
        updateScoresForMove(moveResult);
        checkGameOver(gameCopy);
      }
      
    } catch (error) {
      console.error("Error in aiMove:", error);
    }
  }

  function checkGameOver(gameObj) {
    try {
      if (gameObj.isCheckmate()) {
        const winner = gameObj.turn() === 'w' ? 'Black' : 'White';
        setTimeout(() => alert(`Oyun bitti! Kazanan: ${winner}`), 100);
      } else if (gameObj.isStalemate()) {
        setTimeout(() => alert("Oyun pat! Berabere."), 100);
      } else if (gameObj.isDraw()) {
        setTimeout(() => alert("Oyun berabere (draw)."), 100);
      }
    } catch (error) {
      console.error("Error in checkGameOver:", error);
      // Fallback - eski metodları dene
      try {
        if (gameObj.in_checkmate && gameObj.in_checkmate()) {
          const winner = gameObj.turn() === 'w' ? 'Black' : 'White';
          setTimeout(() => alert(`Oyun bitti! Kazanan: ${winner}`), 100);
        } else if (gameObj.in_stalemate && gameObj.in_stalemate()) {
          setTimeout(() => alert("Oyun pat! Berabere."), 100);
        } else if (gameObj.in_draw && gameObj.in_draw()) {
          setTimeout(() => alert("Oyun berabere (draw)."), 100);
        }
      } catch (fallbackError) {
        console.error("Both new and old Chess.js methods failed:", fallbackError);
      }
    }
  }

  // Basitleştirilmiş useEffect
  useEffect(() => {
    console.log("useEffect triggered - History length:", history.length, "Turn:", game.turn());
    
    // İlk hamle değilse ve siyahın sırası ise AI oynasın
    const shouldAiMove = history.length > 0 && game.turn() === 'b';
    
    let gameOver = false;
    try {
      gameOver = game.isGameOver();
    } catch (e) {
      try {
        gameOver = game.game_over && game.game_over();
      } catch (e2) {
        gameOver = false;
      }
    }
    
    if (shouldAiMove && !gameOver) {
      console.log("Setting timer for AI move");
      const timer = setTimeout(() => {
        console.log("Timer fired, calling aiMove");
        aiMove();
      }, 500);
      
      return () => {
        console.log("Cleaning up timer");
        clearTimeout(timer);
      };
    }
  }, [history.length]); // Sadece history.length'i takip et

  return (
    <div>
      <div className="chess-container">
        <Chessboard
          position={game.fen()}
          onPieceDrop={onDrop}
          boardOrientation="white"
          boardWidth={560}
          animationDuration={200}
          arePiecesDraggable={true}
          arePremovesAllowed={false}
          snapToCursor={true}
        />
      </div>
      <div className="scoreboard">
        Puanlar - White: {whiteScore} | Black: {blackScore}
        <br />
        <small>Turn: {game.turn()}, Moves: {history.length}</small>
      </div>
    </div>
  );
});

export default ChessboardComponent;