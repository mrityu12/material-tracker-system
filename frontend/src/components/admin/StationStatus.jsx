import React, { useState, useEffect } from 'react';
import { MapPin, Search } from 'lucide-react';

export default function StationStatus({ allData }) {
  const [selectedCluster, setSelectedCluster] = useState('');
  const [stationsList, setStationsList] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  // Unique clusters
  const clusters = [...new Set(allData.map((d) => d.cluster))];

  // Load stations after selecting cluster
  useEffect(() => {
    if (selectedCluster) {
      const stations = allData
        .filter((r) => r.cluster === selectedCluster)
        .map((r) => r.station);

      setStationsList([...new Set(stations)]);
      setSelectedStation(null);
    }
  }, [selectedCluster]);

  // Load station data
  const stationRecord = selectedStation
    ? allData.find(
        (r) => r.cluster === selectedCluster && r.station === selectedStation
      )
    : null;

  const getStatusBadge = (status) => {
    const statusMap = {
      completed: {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: "✅",
        label: "Completed",
      },
      "in-progress": {
        bg: "bg-blue-100",
        text: "text-blue-700",
        icon: "🔄",
        label: "In Progress",
      },
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        icon: "⏳",
        label: "Pending",
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: "❌",
        label: "Cancelled",
      },
    };

    const s = statusMap[status] || statusMap["pending"];
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-bold ${s.bg} ${s.text}`}>
        {s.icon} {s.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <MapPin size={24} className="text-blue-600" />
        Station Status
      </h2>

      {/* Cluster Select */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Cluster
        </label>
        <select
          value={selectedCluster}
          onChange={(e) => setSelectedCluster(e.target.value)}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg"
        >
          <option value="">Choose cluster...</option>
          {clusters.map((cl) => (
            <option key={cl} value={cl}>
              {cl}
            </option>
          ))}
        </select>
      </div>

      {/* Stations List */}
      {selectedCluster && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-3 text-gray-700">
            Select Station in {selectedCluster}
          </h3>

          {stationsList.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No stations found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {stationsList.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStation(st)}
                  className={`p-3 border-2 rounded-lg text-left transition-all ${
                    selectedStation === st
                      ? "bg-blue-600 text-white border-blue-700"
                      : "bg-white hover:bg-blue-50 border-gray-300 text-gray-800"
                  }`}
                >
                  <MapPin size={18} className="inline mr-2 text-blue-600" />
                  {st}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Show Selected Station Data */}
      {stationRecord && (
        <div className="border-2 border-gray-200 rounded-lg p-4 hover:shadow-md transition-all mt-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <MapPin size={18} className="text-blue-600" />
                {stationRecord.cluster} - {stationRecord.station}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                Updated by:
                <span className="font-semibold text-blue-600"> {stationRecord.updatedBy}</span>
              </p>
            </div>

            <div className="text-right">
              {getStatusBadge(stationRecord.status || "pending")}
              <p className="text-xs text-gray-500 mt-2">
                {formatDate(stationRecord.lastUpdated)}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600">Items Used</p>
              <p className="text-xl font-bold text-blue-600">
                {stationRecord.items.filter((i) => i.used > 0).length}
              </p>
            </div>

            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-gray-600">Total Materials</p>
              <p className="text-xl font-bold text-green-600">
                {stationRecord.items.reduce((sum, i) => sum + i.used, 0)}
              </p>
            </div>

            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-xs text-gray-600">Completion</p>
              <p className="text-xl font-bold text-purple-600">
                {(
                  (stationRecord.items.filter((i) => i.used === i.total).length /
                    stationRecord.items.filter((i) => i.used > 0).length) *
                  100 || 0
                ).toFixed(0)}
                %
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
