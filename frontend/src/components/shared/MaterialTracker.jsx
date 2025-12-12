import React from 'react';
import { CheckCircle, Clock, XCircle, TrendingUp } from 'lucide-react';

// Shared Material Item Component
export function MaterialItem({ item, onUpdateUsed, showControls = true }) {
  const remaining = item.total - (item.used || 0);
  const isHDDItem = item.work === "HDD";

  const getRemainingColor = (remaining, total) => {
    if (total === 0) return 'bg-gray-100 text-gray-400';
    if (remaining === 0) return 'bg-red-50 text-red-700 border-red-300';
    if (remaining <= total * 0.2) return 'bg-orange-50 text-orange-700 border-orange-300';
    return 'bg-green-50 text-green-700 border-green-300';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      {isHDDItem ? (
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-12 md:col-span-8">
            <h3 className="font-medium text-gray-800 text-sm">{item.name}</h3>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded mt-1 inline-block">
              {item.unit}
            </span>
          </div>

          <div className="col-span-12 md:col-span-4">
            <label className="text-xs text-gray-600 block mb-1">
              Enter Quantity / मात्रा दर्ज करें
            </label>
            <input
              type="number"
              value={item.total || ''}
              onChange={(e) => onUpdateUsed && onUpdateUsed(item.id, 'total', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border-2 border-purple-300 rounded-md font-bold text-center focus:ring-2 focus:ring-purple-500"
              placeholder="Enter quantity"
              min="0"
              disabled={!showControls}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-12 md:col-span-5">
            <h3 className="font-medium text-gray-800 text-sm">{item.name}</h3>
            <div className="flex gap-2 mt-1">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{item.unit}</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{item.work}</span>
            </div>
          </div>

          <div className="col-span-4 md:col-span-2">
            <label className="text-xs text-gray-600 block mb-1">Total</label>
            <div className="px-3 py-2 bg-gray-50 border rounded-md font-bold text-center">
              {item.total}
            </div>
          </div>

          {showControls && (
            <>
              <div className="col-span-4 md:col-span-2">
                <label className="text-xs text-gray-600 block mb-1">Used</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateUsed && onUpdateUsed(item.id, 'decrease')}
                    disabled={(item.used || 0) === 0}
                    className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 disabled:opacity-30 transition-colors"
                  >
                    <span className="text-lg">−</span>
                  </button>
                  <span className="font-bold text-lg min-w-[40px] text-center">{item.used || 0}</span>
                  <button
                    onClick={() => onUpdateUsed && onUpdateUsed(item.id, 'increase')}
                    disabled={remaining === 0}
                    className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 disabled:opacity-30 transition-colors"
                  >
                    <span className="text-lg">+</span>
                  </button>
                </div>
              </div>

              <div className="col-span-4 md:col-span-3">
                <label className="text-xs text-gray-600 block mb-1">Remaining</label>
                <div className={`px-4 py-2 rounded-lg border-2 font-bold text-center ${getRemainingColor(remaining, item.total)}`}>
                  {remaining} {item.unit}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Progress Bar */}
      {item.total > 0 && showControls && !isHDDItem && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                remaining === 0 ? 'bg-red-500' :
                remaining <= item.total * 0.2 ? 'bg-orange-500' :
                'bg-green-500'
              }`}
              style={{ width: `${((item.used || 0) / item.total) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 text-center">
            {(((item.used || 0) / item.total) * 100).toFixed(1)}% used
          </p>
        </div>
      )}
    </div>
  );
}

// Status Badge Component
export function StatusBadge({ status }) {
  const statusConfig = {
    'completed': {
      icon: <CheckCircle size={16} />,
      label: 'Completed',
      className: 'bg-green-100 text-green-700 border-green-300'
    },
    'in-progress': {
      icon: <TrendingUp size={16} />,
      label: 'In Progress',
      className: 'bg-blue-100 text-blue-700 border-blue-300'
    },
    'pending': {
      icon: <Clock size={16} />,
      label: 'Pending',
      className: 'bg-yellow-100 text-yellow-700 border-yellow-300'
    },
    'cancelled': {
      icon: <XCircle size={16} />,
      label: 'Cancelled',
      className: 'bg-red-100 text-red-700 border-red-300'
    }
  };

  const config = statusConfig[status] || statusConfig['pending'];

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold border-2 ${config.className}`}>
      {config.icon}
      {config.label}
    </span>
  );
}

// Loading Spinner Component
export function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      <p className="mt-4 text-gray-600 font-medium">{message}</p>
    </div>
  );
}

// Empty State Component
export function EmptyState({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-gray-300 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}

// Search Box Component
export function SearchBox({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-3 text-gray-400"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}

// Date Range Picker Component
export function DateRangePicker({ dateFrom, dateTo, onFromChange, onToChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          📅 From Date / से तारीख
        </label>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => onFromChange(e.target.value)}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          📅 To Date / तक तारीख
        </label>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => onToChange(e.target.value)}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}