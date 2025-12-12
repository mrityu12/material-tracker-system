import React from 'react';
import { MapPin, CheckCircle, Clock, XCircle, TrendingUp } from 'lucide-react';
import { clusters } from "../../utils/constants";   // <-- FIXED

export default function ClusterStatus({ allData }) {

  const getClusterStats = (cluster) => {
    const clusterRecords = allData.filter(r => r.cluster === cluster);

    const total = clusterRecords.length;

    // Compare lowercase to avoid mismatch
    const completed = clusterRecords.filter(r => r.status?.toLowerCase() === 'completed').length;
    const inProgress = clusterRecords.filter(r => r.status?.toLowerCase() === 'in-progress').length;
    const pending = clusterRecords.filter(r => !r.status || r.status?.toLowerCase() === 'pending').length;
    const cancelled = clusterRecords.filter(r => r.status?.toLowerCase() === 'cancelled').length;

    return { total, completed, inProgress, pending, cancelled };
  };

  const getStatusColor = (stats) => {
    if (stats.total === 0) return 'bg-gray-100 border-gray-300';

    const completionRate = (stats.completed / stats.total) * 100;

    if (completionRate === 100) return 'bg-green-50 border-green-300';
    if (completionRate >= 70) return 'bg-blue-50 border-blue-300';
    if (completionRate >= 40) return 'bg-yellow-50 border-yellow-300';
    return 'bg-red-50 border-red-300';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <MapPin size={24} className="text-blue-600" />
        Cluster Status Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clusters.map(cluster => {
          const stats = getClusterStats(cluster);

          return (
            <div 
              key={cluster}
              className={`border-2 rounded-lg p-4 transition-all hover:shadow-md ${getStatusColor(stats)}`}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-800">{cluster}</h3>
                <div className="text-sm bg-white px-2 py-1 rounded shadow">
                  {stats.total} records
                </div>
              </div>

              <div className="space-y-2">
                <StatusRow label="Completed" icon={<CheckCircle size={16} className="text-green-600" />} value={stats.completed} color="text-green-600" />
                <StatusRow label="In Progress" icon={<TrendingUp size={16} className="text-blue-600" />} value={stats.inProgress} color="text-blue-600" />
                <StatusRow label="Pending" icon={<Clock size={16} className="text-yellow-600" />} value={stats.pending} color="text-yellow-600" />
                <StatusRow label="Cancelled" icon={<XCircle size={16} className="text-red-600" />} value={stats.cancelled} color="text-red-600" />
              </div>

              {stats.total > 0 && (
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1 text-center">
                    {((stats.completed / stats.total) * 100).toFixed(0)}% Complete
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatusRow({ label, icon, value, color }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-sm">{icon}{label}</span>
      <span className={`font-bold ${color}`}>{value}</span>
    </div>
  );
}
