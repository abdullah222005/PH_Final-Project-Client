import React from "react";
import {
  Package,
  Truck,
  DollarSign,
  Clock,
  Users,
  Home,
  BarChart3,
  Settings,
  LogOut,
  User,
} from "lucide-react";

// Stat Card Component
export const StatCard = ({ icon: Icon, title, value, color, change, loading }) => {
  const colors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    indigo: "bg-indigo-500",
    orange: "bg-orange-500",
    purple: "bg-purple-500",
    red: "bg-red-500",
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gray-300 p-3 rounded-lg w-12 h-12"></div>
          <div className="bg-gray-200 h-4 w-12 rounded"></div>
        </div>
        <div className="bg-gray-200 h-4 w-24 rounded mb-2"></div>
        <div className="bg-gray-300 h-8 w-20 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`${colors[color]} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <span
            className={`text-sm font-medium ${
              change.startsWith("+") ? "text-green-600" : "text-red-600"
            }`}
          >
            {change}
          </span>
        )}
      </div>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  );
};

// Navigation Item Component
export const NavItem = ({ icon: Icon, text, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      active
        ? "bg-indigo-50 text-indigo-600"
        : "text-gray-700 hover:bg-gray-50"
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{text}</span>
  </button>
);

// Status Badge Component
export const StatusBadge = ({ status }) => {
  const getStatusStyle = (status) => {
    const normalizedStatus = status?.toLowerCase() || '';
    
    if (normalizedStatus.includes('pending') || normalizedStatus.includes('pickup')) {
      return { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending Pickup" };
    }
    if (normalizedStatus.includes('transit') || normalizedStatus.includes('picked')) {
      return { bg: "bg-blue-100", text: "text-blue-800", label: "In Transit" };
    }
    if (normalizedStatus.includes('delivered')) {
      return { bg: "bg-green-100", text: "text-green-800", label: "Delivered" };
    }
    if (normalizedStatus.includes('cancelled')) {
      return { bg: "bg-red-100", text: "text-red-800", label: "Cancelled" };
    }
    return { bg: "bg-gray-100", text: "text-gray-800", label: status || "Unknown" };
  };

  const style = getStatusStyle(status);

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${style.bg} ${style.text}`}
    >
      {style.label}
    </span>
  );
};

// Loading Spinner Component
export const LoadingSpinner = ({ size = "md", fullScreen = false }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const spinner = (
    <div className="flex items-center justify-center">
      <div
        className={`${sizes[size]} border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin`}
      ></div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

// Empty State Component
export const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="text-center py-12">
    <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 mb-6">{description}</p>
    {action && action}
  </div>
);

// Error Message Component
export const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
    <div className="flex items-start">
      <div className="flex-1">
        <h3 className="text-sm font-medium text-red-800">Error</h3>
        <p className="text-sm text-red-700 mt-1">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-3 text-sm font-medium text-red-700 hover:text-red-900"
        >
          Retry
        </button>
      )}
    </div>
  </div>
);

// Table Component
export const Table = ({ headers, children, loading }) => {
  if (loading) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[...Array(5)].map((_, idx) => (
              <tr key={idx} className="animate-pulse">
                {headers.map((_, cellIdx) => (
                  <td key={cellIdx} className="px-4 py-3">
                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, idx) => (
              <th
                key={idx}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
      </table>
    </div>
  );
};

// Modal Component
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Confirm Dialog Component
export const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel" }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-sm text-gray-500 mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          {cancelText}
        </button>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};
