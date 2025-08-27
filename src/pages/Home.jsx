import React, { useState, useEffect } from "react";
import "../App.css";                       // App.css'i burada import et
import ChessboardComponent from "../components/ChessboardComponent";
import { Chessboard } from "react-chessboard";

function Home() {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 3000); // 3sn sonra geçiş
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
                <button>Reset</button>
                <button>Undo</button>
            </div>

            <div className="game-area">
                <div className="board">
                    <div className="chess-container">
                        <ChessboardComponent />
                    </div>
                </div>
                <div className="ai-coach">

                </div>
            </div>


            <div className="previous-move">

            </div>



        </div>
    );
}

export default Home;
