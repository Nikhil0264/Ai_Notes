import React from "react";

const stats = [
  { title: "Active Notes", value: 12 },
  { title: "Completed Tasks", value: 34 },
  { title: "Pending Tasks", value: 7 },
];

const RealTimeTrack = () => {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">📡 Real-Time Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-[#172842] rounded-xl p-6 shadow hover:scale-105 transition"
          >
            <p className="text-blue-300">{item.title}</p>
            <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="bg-[#172842] rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-3 text-blue-200">
          <li>✅ Todo “Learn React Context” completed</li>
          
          <li>📝 New Todo added: “Build Dashboard UI”</li>
          <li>🔄 Todo updated: “Fix MongoDB Error”</li>
        </ul>
      </div>

    </div>
  );
};

export default RealTimeTrack;
