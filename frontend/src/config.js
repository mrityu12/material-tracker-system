// API Configuration
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// App Configuration
export const APP_NAME = 'Material Usage Tracker';
export const APP_VERSION = '1.0.0';

// Pagination
export const ITEMS_PER_PAGE = 10;
export const MAX_ITEMS_PER_PAGE = 50;

// Date Formats
export const DATE_FORMAT = 'DD MMM YYYY';
export const DATETIME_FORMAT = 'DD MMM YYYY, hh:mm A';

// Status Types
export const STATUS_TYPES = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  WORKER: 'worker'
};

// Work Categories
export const WORK_CATEGORIES = [
  'All',
  'Active',
  'Passive - A',
  'Passive - B',
  'Trenching',
  'HDD'
];

// Report Types
export const REPORT_TYPES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly'
};

// Color Scheme
export const COLORS = {
  primary: '#3B82F6',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#06B6D4',
  gray: '#6B7280'
};

// API Endpoints
export const ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  SAVE_DATA: '/data/save',
  LOAD_DATA: '/data/load',
  ALL_DATA: '/data/all',
  DELETE_DATA: '/data/delete'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  THEME: 'theme'
};

// Validation Rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_USERNAME_LENGTH: 50,
  MAX_STATION_NAME_LENGTH: 100
};

// Feature Flags
export const FEATURES = {
  ENABLE_REPORTS: true,
  ENABLE_EXPORT: true,
  ENABLE_NOTIFICATIONS: false,
  ENABLE_DARK_MODE: false
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error! Please check your connection.',
  AUTH_ERROR: 'Authentication failed! Please login again.',
  SAVE_ERROR: 'Error saving data! Please try again.',
  LOAD_ERROR: 'Error loading data! Please refresh the page.',
  INVALID_INPUT: 'Invalid input! Please check your data.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  SAVE_SUCCESS: 'Data saved successfully!',
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  DELETE_SUCCESS: 'Data deleted successfully!'
};