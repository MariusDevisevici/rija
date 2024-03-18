import React from "react";

interface ICursor {
  position: { x: number; y: number };
  userName: string;
}

const Cursor = ({ position, userName }: ICursor) => {
  return (
    <div
      className="pointer-events-none absolute flex items-baseline gap-2"
      style={{ left: position.x, top: position.y }}
    >
      <div
        className="h-0 w-0 
        rotate-[75deg]
        border-b-[15px] border-l-[10px]
        border-r-[10px] border-b-yellow-500
        border-l-transparent border-r-transparent"
      />
      {userName}
    </div>
  );
};

export default Cursor;
