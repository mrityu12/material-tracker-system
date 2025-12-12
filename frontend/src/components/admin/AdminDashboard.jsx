import React, { useState, useEffect, useCallback } from "react";
import ClusterStatus from "./ClusterStatus";
import StationStatus from "./StationStatus";
import WorkStatus from "./WorkStatus";
import ProductivityChart from "./ProductivityChart";
import Reports from "./Reports";
import { LogOut } from "lucide-react";

const API_URL =
  (process.env.REACT_APP_API_URL || "http://localhost:5000") + "/api";

export default function AdminDashboard({ username, authToken, onLogout }) {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // FIXED: useCallback added to prevent missing dependency warning
  const loadAllData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/data/all`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.ok) {
        const data = await response.json();
        setAllData(data);
      }
    } catch (error) {
      console.error("Error loading admin data");
    }
    setLoading(false);
  }, [authToken]);

  // FIXED useEffect dependency issue
  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  const tabs = [
    { id: "overview", name: "📊 Overview", component: null },
    { id: "cluster", name: "🗂️ Cluster Status", component: ClusterStatus },
    { id: "station", name: "📍 Station Status", component: StationStatus },
    { id: "work", name: "⚙️ Work Status", component: WorkStatus },
    { id: "productivity", name: "📈 Productivity", component: ProductivityChart },
    { id: "reports", name: "📄 Reports", component: Reports },
  ];

  const ActiveComponent = tabs.find((t) => t.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">Welcome, {username}</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          {activeTab === "overview" ? (
            <OverviewDashboard allData={allData} loading={loading} />
          ) : (
            ActiveComponent && (
              <ActiveComponent allData={allData} authToken={authToken} />
            )
          )}
        </div>
      </div>
    </div>
  );
}

/* ===================== OVERVIEW CARDS COMPONENT ===================== */

function OverviewDashboard({ allData }) {
  const totalRecords = allData.length;
  const completed = allData.filter((r) => r.status === "completed").length;
  const inProgress = allData.filter((r) => r.status === "in-progress").length;
  const pending = allData.filter((r) => !r.status || r.status === "pending")
    .length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Records */}
      <Card
        icon="📊"
        title="Total Records"
        value={totalRecords}
        color="text-blue-600"
        bg="bg-blue-100"
      />

      {/* Completed */}
      <Card
        icon="✅"
        title="Completed"
        value={completed}
        color="text-green-600"
        bg="bg-green-100"
      />

      {/* In Progress */}
      <Card
        icon="🔄"
        title="In Progress"
        value={inProgress}
        color="text-blue-600"
        bg="bg-blue-100"
      />

      {/* Pending */}
      <Card
        icon="⏳"
        title="Pending"
        value={pending}
        color="text-yellow-600"
        bg="bg-yellow-100"
      />
    </div>
  );
}

/* ===================== CARD COMPONENT ===================== */

function Card({ icon, title, value, color, bg }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-3">
        <div className={`p-3 ${bg} rounded-lg`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}
