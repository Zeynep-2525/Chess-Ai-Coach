import { useState, useRef, useEffect } from "react";

export default function Toolbar({ onReset, onUndo, onHint, onToggleTheme, onSelectOpening }) {
  const [showOptionsDropdown, setShowOptionsDropdown] = useState(false);
  const [showOpeningsDropdown, setShowOpeningsDropdown] = useState(false);

  const optionsRef = useRef(null);
  const openingsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptionsDropdown(false);
      }
      if (openingsRef.current && !openingsRef.current.contains(event.target)) {
        setShowOpeningsDropdown(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const openingsList = [
    "İspanyol Açılışı",
    "Sicilya Savunması",
    "İtalyan Açılışı"
  ];

  return (
    <div className="toolbar">
      <button onClick={onHint}>Hint</button>

      {/* Options dropdown */}
      <div ref={optionsRef} style={{ position: "relative", display: "inline-block" }}>
        <button onClick={() => setShowOptionsDropdown(prev => !prev)}>Options</button>
        {showOptionsDropdown && (
          <div className="dropdown show">
            <div className="dropdown-item" onClick={onToggleTheme}>Tema değiştir</div>
          </div>
        )}
      </div>

      {/* Openings dropdown */}
      <div ref={openingsRef} style={{ position: "relative", display: "inline-block" }}>
        <button onClick={() => setShowOpeningsDropdown(prev => !prev)}>Openings</button>
        {showOpeningsDropdown && (
          <div className="dropdown show">
            {openingsList.map((opening, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => {
                   console.log("Seçilen açılış:", opening);
                  if (onSelectOpening) onSelectOpening(opening);
                  setShowOpeningsDropdown(false);
                }}
              >
                {opening}
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={onReset}>Reset</button>
      <button onClick={onUndo}>Undo</button>
    </div>
  );
}
