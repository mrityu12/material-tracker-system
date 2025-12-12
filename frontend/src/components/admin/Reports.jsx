import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Reports({ allData }) {
  const [reportType, setReportType] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const generatePDF = () => {
    const reportData = getReportData();
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Work Report", 14, 15);

    doc.setFontSize(12);
    doc.text(`Report Type: ${reportType.toUpperCase()}`, 14, 25);
    doc.text(`Date: ${selectedDate}`, 14, 32);

    const tableData = reportData.map(row => [
      row.cluster,
      row.station,
      row.updatedBy,
      row.totalMaterials,
      row.status,
      row.lastUpdated
    ]);

    autoTable(doc, {
      head: [["Cluster", "Station", "Worker", "Materials Used", "Status", "Last Updated"]],
      body: tableData,
      startY: 40,
    });

    doc.save(`${reportType}-report-${selectedDate}.pdf`);
  };

  const generateReport = () => {
    const reportData = getReportData();
    const csvContent = convertToCSV(reportData);
    downloadCSV(csvContent, `${reportType}-report-${selectedDate}.csv`);
  };

  const getReportData = () => {
    const filtered = allData.filter(record => {
      const recordDate = new Date(record.lastUpdated);
      const targetDate = new Date(selectedDate);

      if (reportType === 'daily') {
        return recordDate.toDateString() === targetDate.toDateString();
      } 
      else if (reportType === 'weekly') {
        const weekStart = new Date(targetDate);
        weekStart.setDate(targetDate.getDate() - targetDate.getDay());

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        return recordDate >= weekStart && recordDate <= weekEnd;
      } 
      else if (reportType === 'monthly') {
        return (
          recordDate.getMonth() === targetDate.getMonth() &&
          recordDate.getFullYear() === targetDate.getFullYear()
        );
      }

      return false;
    });

    return filtered.map(record => {
      const usedItems = record.items.filter(item => item.used > 0);
      const totalMaterials = usedItems.reduce((sum, item) => sum + item.used, 0);

      return {
        cluster: record.cluster,
        station: record.station,
        updatedBy: record.updatedBy,
        itemsUsed: usedItems.length,
        totalMaterials: totalMaterials,
        status: record.status || 'Pending',
        lastUpdated: new Date(record.lastUpdated).toLocaleString()
      };
    });
  };

  const convertToCSV = (data) => {
    if (data.length === 0) return '';

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    return [headers, ...rows].join('\n');
  };

  const downloadCSV = (content, filename) => {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    window.URL.revokeObjectURL(url);
  };

  // ⭐ REPORT DATA GENERATED (AND NOW USED IN UI TO FIX WARNING)
  const reportData = getReportData();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FileText size={24} className="text-indigo-600" />
        Work Reports
      </h2>

      {/* Report Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Report Type
          </label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg"
          >
            <option value="daily">Daily Report</option>
            <option value="weekly">Weekly Report</option>
            <option value="monthly">Monthly Report</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex items-end gap-2">
          <button
            onClick={generateReport}
            className="w-full px-4 py-2 bg-green-600 text-green-1000 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
          >
            <Download size={20} />
            CSV Download
          </button>

          <button
            onClick={generatePDF}
            className="w-full px-4 py-2 bg-red-600 text-red-1000 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
          >
            <FileText size={20} />
            PDF Download
          </button>
        </div>
      </div>

      {/* ⭐ FIX: Using reportData so ESLINT warning does NOT appear */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 font-semibold">
        📊 Total Records Found: {reportData.length}
      </div>
    </div>
  );
}
