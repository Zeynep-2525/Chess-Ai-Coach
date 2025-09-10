import React from "react";
import { Chessboard } from "react-chessboard";

// 🔹 Buraya ekle, component dışında
const openingsData = {
  "İspanyol Açılışı": {
    fen: "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 4",
    description: `
İspanyol Açılışı (Ruy López), satrançta en klasik açılışlardan biridir.
Beyaz genellikle e4 ve at f3 ile başlar, ardından fil b5'e çıkar.
Amaç, siyahın atını ve e5 piyonu üzerindeki baskıyı artırmak ve merkezi kontrol etmektir.
`
  },
  "Sicilya Savunması": {
    fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    description: `
Sicilya Savunması, Siyahın 1...c5 hamlesi ile başlar ve asimetrik bir oyun sunar.
Beyaz e4 ile merkezi kontrol etmeye çalışırken, siyah yan kanattan saldırı fırsatları yaratır.
`
  },
  "İtalyan Açılışı": {
    fen: "r1bqkbnr/pppp1ppp/2n5/4P3/1B6/5N2/PPPP1PPP/RNBQK2R b KQkq - 2 3",
    description: `
İtalyan Açılışı, beyazın e4 ve at f3 hamleleri ile başlar, ardından fil c4'e çıkar.
Amaç, hızlı taş gelişimi ve merkez kontrolü sağlamaktır.
`
  }
};

export default function OpeningsPanel({ selectedOpening }) {
  if (!selectedOpening) return null;

  const opening = openingsData[selectedOpening];

  console.log("OpeningsPanel render:", selectedOpening);

  return (
    <div className="openings-panel" style={{ marginTop: "10px" }}>
      <div className="description">
        <h2>{selectedOpening}</h2>
        <p style={{ whiteSpace: "pre-line", lineHeight: "1.5" }}>
          {opening.description}
        </p>
      </div>
      <div className="chessboard">
        <Chessboard
          position={opening.fen}
          boardWidth={400}
          arePiecesDraggable={false}
        />
      </div>
    </div>
  );
}
