import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const ChessboardComponent = forwardRef((props, ref) => {
  const [game, setGame] = useState(new Chess()); //hooklar
  const [history, setHistory] = useState([]);

  function resetGame() {
    console.log("Reset game called");
    setGame(new Chess());
  }

  function undoMove() {
  const move = game.undo(); // direkt mevcut game objesini kullan
  if (!move) return console.log("Geri alınacak hamle yok!");

  console.log("Hamle geri alındı:", move);
  setGame(new Chess(game.fen())); // state’i güncelle yeni obje oluştur sonra oyunun tüm geçmiş hamlelerini içine at
  setHistory(prev => prev.slice(0, -1)); //son hamleyi historyden sil
}


  useImperativeHandle(ref, () => ({
    resetGame,
    undoMove,
  }));

  function onDrop(sourceSquare, targetSquare, piece) {
    console.log(`Hamle deneniyor: ${sourceSquare} -> ${targetSquare}`);
    console.log("Mevcut board pozisyonu:", game.fen());
    
    const gameCopy = new Chess(game.fen());
    
    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
      
      console.log("Hamle sonucu:", move);
      
      if (move) {
        console.log("Hamle başarılı, board güncelleniyor");
        setGame(gameCopy);

        setHistory(prevHistory => [...prevHistory, {from: sourceSquare, to:targetSquare}]); //hamle yaptıkça history güncellenecek- ...prevHistory bu arrayin tüm elemanları kullanılacak demek(spread operatörü)
       
        return true;
      } else {
        console.log("Hamle geçersiz");
        return false;
      }
    } catch (error) {
      console.error("Hamle hatası:", error);
      return false;
    }
  }

  // Component mount olduğunda chess.js'in çalışıp çalışmadığını test et
  useEffect(() => {
    console.log("ChessboardComponent mounted");
    console.log("Chess.js version:", Chess.version || "version bilgisi yok");
    console.log("Initial game position:", game.fen());
    
    // Test hamle dene
    const testGame = new Chess();
    const testMove = testGame.move('e4');
    console.log("Test move (e4) sonucu:", testMove);
  }, []);

  return (
    <div className="chess-container">
      <Chessboard
        position={game.fen()}
        onPieceDrop={onDrop}
        onPieceDragBegin={(piece, sourceSquare) => {
          console.log(`Taş alındı: ${piece} from ${sourceSquare}`);
        }}
        onPieceDragEnd={(piece, sourceSquare) => {
          console.log(`Taş bırakıldı: ${piece} from ${sourceSquare}`);
        }}
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



/*Hatanız neydi:
Aslında kodunuzda büyük bir hata yoktu. Sorun şu küçük detaylardaydı:

safeGameMutate fonksiyonunda - Önceki kodunuzda const update = new Chess(game.fen()) yazdıktan sonra modify(update) çağırıyordunuz ama sonra setGame(update) yerine bazen setGame(gameCopy) yazıyordunuz. Variable isimleri karışıktı.
onDrop fonksiyonunda return logic - Bazen moveMade boolean'ını doğru return etmiyordunuz.

Ne değiştirdik:

Kodu sadeleştirdik: safeGameMutate yerine direkt onDrop içinde Chess kopyası oluşturduk
Daha net return logic: if (move) kontrolü ile net bir şekilde true/false döndürüyoruz
Debug mesajları ekledi: Böylece neyin çalışıp neyin çalışmadığını görebildik
Try-catch ekledik: Hataları yakalayıp konsola yazıyor*/