import React, { useState } from "react";
import { Calendar, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function WorkStatus({ allData }) {
  const [open, setOpen] = useState(null); // Which box is open?

  const today = new Date().toDateString();
  const thisWeek = getWeekRange();
  const thisMonth = new Date().getMonth();

  const todayWork = allData.filter(r => new Date(r.lastUpdated).toDateString() === today);
  const weeklyWork = allData.filter(r => {
    const d = new Date(r.lastUpdated);
    return d >= thisWeek.start && d <= thisWeek.end;
  });
  const monthlyWork = allData.filter(r => new Date(r.lastUpdated).getMonth() === thisMonth);

  const boxes = [
    {
      id: "today",
      title: "Today's Work",
      icon: <Calendar className="text-red-500" />,
      color: "#ff2d2d",
      data: todayWork,
    },
    {
      id: "week",
      title: "Weekly Work",
      icon: <TrendingUp className="text-yellow-500" />,
      color: "#ffc300",
      data: weeklyWork,
    },
    {
      id: "month",
      title: "Monthly Work",
      icon: <TrendingUp className="text-green-600" />,
      color: "#00b35a",
      data: monthlyWork,
    }
  ];

  return (
    <div className="space-y-6">

      {/* TOP BUTTONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {boxes.map(box => (
          <button
            key={box.id}
            onClick={() => setOpen(open === box.id ? null : box.id)}
            className="border rounded-xl shadow-md bg-white p-4 hover:shadow-lg transition relative"
          >
            <div
              className="absolute top-0 left-0 w-full h-2 rounded-t-xl"
              style={{ background: box.color }}
            ></div>

            <div className="flex items-center justify-center gap-2 text-lg font-bold mt-2">
              {box.icon}
              {box.title}
            </div>
          </button>
        ))}

      </div>

      {/* OPEN SECTION */}
      {boxes.map(
        box =>
          open === box.id && (
            <ExpandableCard
              key={box.id}
              title={box.title}
              color={box.color}
              icon={box.icon}
              data={box.data}
            />
          )
      )}
    </div>
  );
}

/* ----------------- WEEK RANGE ------------------ */
function getWeekRange() {
  const now = new Date();
  const start = new Date(now.setDate(now.getDate() - now.getDay()));
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { start, end };
}

/* ---------------- EXPANDABLE BOX ---------------- */
function ExpandableCard({ title, color, icon, data }) {
  const total = data.length;
  const completed = data.filter(r => r.status === "completed").length;
  const progress = data.filter(r => r.status === "in-progress").length;
  const pending = data.filter(r => !r.status || r.status === "pending").length;

  const chartData = [
    { label: "Completed", value: completed },
    { label: "In Progress", value: progress },
    { label: "Pending", value: pending },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border overflow-hidden">

      {/* COLOR BAR */}
      <div style={{ background: color }} className="w-full h-2"></div>

      {/* TITLE */}
      <div className="flex items-center gap-2 p-4 border-b">
        {icon}
        <h2 className="text-xl font-bold">{title}</h2>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        <Stat label="Total Work" value={total} color="text-blue-600" />
        <Stat label="Completed" value={completed} color="text-green-600" />
        <Stat label="In Progress" value={progress} color="text-yellow-600" />
        <Stat label="Pending" value={pending} color="text-orange-600" />
      </div>

      {/* GRAPH */}
      <div className="bg-gray-50 p-4 rounded-xl shadow-inner" style={{ height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

/* ----------------- SMALL STAT CARD ------------------ */
function Stat({ label, value, color }) {
  return (
    <div className="bg-white border rounded-lg p-3 shadow-sm text-center">
      <p className="text-sm text-gray-600">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
