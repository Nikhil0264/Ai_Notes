import React from "react";
import Todo from "./Todo";
import RealTimeTrack from "./RealTimeTrack";

const MainContent = () => {
  return (
    <div className="flex h-full">

      {/* Todo Section */}
      <div className="w-[30%] border-r border-blue-900 overflow-y-auto">
        <Todo />
      </div>

      {/* Real-time Tracking */}
      <div className="w-[70%] p-6 bg-[#0f1c33] overflow-y-auto">
        <RealTimeTrack />
      </div>
    </div>
  );
};

export default MainContent;
