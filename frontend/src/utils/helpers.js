// Date formatting helper
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Get date range for week
export const getWeekRange = () => {
  const now = new Date();
  const firstDay = new Date(now.setDate(now.getDate() - now.getDay()));
  const lastDay = new Date(now.setDate(now.getDate() - now.getDay() + 6));
  return { start: firstDay, end: lastDay };
};

// Get date range for month
export const getMonthRange = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { start: firstDay, end: lastDay };
};

// Calculate completion percentage
export const calculateCompletion = (items) => {
  const usedItems = items.filter(item => item.used > 0);
  if (usedItems.length === 0) return 0;
  
  const completed = usedItems.filter(item => item.used === item.total).length;
  return (completed / usedItems.length) * 100;
};

// Get productivity rating
export const getProductivityRating = (workCount) => {
  if (workCount >= 10) return { label: 'Excellent', color: 'bg-green-500', score: 5 };
  if (workCount >= 7) return { label: 'Good', color: 'bg-blue-500', score: 4 };
  if (workCount >= 4) return { label: 'Average', color: 'bg-yellow-500', score: 3 };
  if (workCount >= 2) return { label: 'Below Average', color: 'bg-orange-500', score: 2 };
  return { label: 'Poor', color: 'bg-red-500', score: 1 };
};

// Filter data by date range
export const filterByDateRange = (data, dateFrom, dateTo) => {
  return data.filter(record => {
    const recordDate = new Date(record.lastUpdated);
    
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      if (recordDate < fromDate) return false;
    }
    
    if (dateTo) {
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999);
      if (recordDate > toDate) return false;
    }
    
    return true;
  });
};

// Convert data to CSV
export const convertToCSV = (data) => {
  if (data.length === 0) return '';
  
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(row => 
    Object.values(row).map(val => 
      typeof val === 'string' && val.includes(',') ? `"${val}"` : val
    ).join(',')
  );
  
  return [headers, ...rows].join('\n');
};

// Download CSV file
export const downloadCSV = (content, filename) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Get status color class
export const getStatusColorClass = (status) => {
  const statusColors = {
    'completed': 'bg-green-50 border-green-300',
    'in-progress': 'bg-blue-50 border-blue-300',
    'pending': 'bg-yellow-50 border-yellow-300',
    'cancelled': 'bg-red-50 border-red-300'
  };
  return statusColors[status] || statusColors['pending'];
};

// Group data by key
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
};

// Calculate statistics
export const calculateStats = (data) => {
  const total = data.length;
  const completed = data.filter(r => r.status === 'completed').length;
  const inProgress = data.filter(r => r.status === 'in-progress').length;
  const pending = data.filter(r => !r.status || r.status === 'pending').length;
  const cancelled = data.filter(r => r.status === 'cancelled').length;
  
  return { total, completed, inProgress, pending, cancelled };
};

// Validate date range
export const validateDateRange = (dateFrom, dateTo) => {
  if (!dateFrom || !dateTo) return true;
  
  const from = new Date(dateFrom);
  const to = new Date(dateTo);
  
  return from <= to;
};

// Format number with commas
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};