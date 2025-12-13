import React, { useState, useEffect } from 'react';

const FloatingElements = ({ type, count = 15 }) => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const newElements = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 10 + Math.random() * 15,
      delay: Math.random() * 5,
      size: 10 + Math.random() * 20,
    }));
    setElements(newElements);
  }, [type, count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute bottom-0 animate-float opacity-0 blur-[1px]"
          style={{
            left: `${el.left}%`,
            fontSize: `${el.size}px`,
            animationDuration: `${el.animationDuration}s`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {type}
        </div>
      ))}
      <style>{`
        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
        }
        .animate-float {
          animation-name: float;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

export default FloatingElements;