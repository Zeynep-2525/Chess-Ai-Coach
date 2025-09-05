import React, { useState, useRef, useEffect } from "react";

export default function Toolbar({ onReset, onUndo }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="toolbar">
      <button>Hint</button>

      
      <div ref={dropdownRef} style={{ position: "relative", display: "inline-block" }}>
        <button onClick={() => setShowDropdown(prev => !prev)}>Options</button>

        {showDropdown && (
          <div className={`dropdown ${showDropdown ? "show" : ""}`}>
            <div className="dropdown-item">Tema değiştir</div>
            <div className="dropdown-item">Zorluk seviyesi</div>
            <div className="dropdown-item">dil seçenekleri</div>
          </div>
        )}
      </div>

      <button>Openings</button>
      <button onClick={onReset}>Reset</button>
      <button onClick={onUndo}>Undo</button>
    </div>
  );
}
