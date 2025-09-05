import React, { useEffect, useRef } from "react";

export default function PreviousMoves({ history }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Her history güncellendiğinde scroll sağa kayacak
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [history]);

  return (
    <div className="scrollable-bar" ref={containerRef}>
      {history.map((move, index) => (
        <div key={index} className="move">
          {move.from} → {move.to} ({move.san})
        </div>
      ))}
    </div>
  );
}
