import React, { useState } from 'react';
import { BarChart3, Calendar } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

export default function ProductivityChart({ allData }) {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const getProductivityRating = (workCount) => {
    if (workCount >= 10) return { label: 'Excellent', color: 'bg-green-500', score: 5 };
    if (workCount >= 7) return { label: 'Good', color: 'bg-blue-500', score: 4 };
    if (workCount >= 4) return { label: 'Average', color: 'bg-yellow-500', score: 3 };
    if (workCount >= 2) return { label: 'Below Average', color: 'bg-orange-500', score: 2 };
    return { label: 'Poor', color: 'bg-red-500', score: 1 };
  };

  const getFilteredData = () => {
    if (!dateFrom && !dateTo) return allData;

    return allData.filter((record) => {
      const recordDate = new Date(record.lastUpdated);
      if (dateFrom && recordDate < new Date(dateFrom)) return false;
      if (dateTo) {
        const endDate = new Date(dateTo);
        endDate.setHours(23, 59, 59);
        if (recordDate > endDate) return false;
      }
      return true;
    });
  };

  const filteredData = getFilteredData();

  // ---------------------- DATE WISE GRAPH DATA ----------------------
  const workByDate = {};

  filteredData.forEach((record) => {
    const dateKey = new Date(record.lastUpdated).toISOString().split("T")[0];
    workByDate[dateKey] = (workByDate[dateKey] || 0) + 1;
  });

  const dateChartData = Object.entries(workByDate).map(([date, count]) => ({
    date,
    work: count,
  }));

  // ---------------------- WORKER WISE DATA ----------------------
  const workByWorker = {};

  filteredData.forEach((record) => {
    const worker = record.updatedBy || 'Unknown';
    workByWorker[worker] = (workByWorker[worker] || 0) + 1;
  });

  const workerChartData = Object.entries(workByWorker).map(([worker, count]) => ({
    worker,
    work: count,
  }));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BarChart3 size={24} className="text-purple-600" />
        Productivity Analysis
      </h2>

      {/* Date Range Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div>
          <label className="block mb-2 font-medium flex gap-2">
            <Calendar size={16} className="text-blue-600" /> From Date
          </label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium flex gap-2">
            <Calendar size={16} className="text-blue-600" /> To Date
          </label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* ---------------------- DATE-WISE GRAPH ---------------------- */}
      <div className="mb-10 bg-gray-50 p-4 rounded-xl shadow-inner">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">
          Date Wise Work Progress
        </h3>

        {dateChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={dateChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(d) =>
                  new Date(d).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                  })
                }
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="work" fill="#4f46e5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500 py-6">No work in selected dates</p>
        )}
      </div>

      {/* ---------------------- WORKER CARDS ---------------------- */}
      <div className="space-y-4">
        {Object.entries(workByWorker).map(([worker, count]) => {
          const rating = getProductivityRating(count);

          return (
            <div key={worker} className="border-2 border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{worker}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-800">{count}</span>
                  <span className="text-sm text-gray-600">works</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-medium">Rating:</span>
                <span className={`px-3 py-1 rounded-full text-white ${rating.color}`}>
                  {rating.label}
                </span>

                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}
                      className={i < rating.score ? 'text-yellow-400' : 'text-gray-300'}>
                      ⭐
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${rating.color}`}
                  style={{ width: `${Math.min((count / 10) * 100, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
