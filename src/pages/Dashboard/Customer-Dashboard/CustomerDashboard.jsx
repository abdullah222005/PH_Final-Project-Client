import React, { useState } from "react";
import { Package, MapPin, Clock, CheckCircle, XCircle } from "lucide-react";
import { useParcels, usePayments } from "../hooks/useData";
import {
  StatusBadge,
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
} from "./SharedComponents";

const CustomerDashboard = ({ currentUser }) => {
  const { parcels, loading, error, refetch } = useParcels(currentUser.email);
  const { payments } = usePayments(currentUser.email);

  const [selectedOrder, setSelectedOrder] = useState(null);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  // Separate orders by status
  const activeParcels = parcels.filter(
    (p) =>
      p.deliveryStatus?.toLowerCase() !== "delivered" &&
      p.deliveryStatus?.toLowerCase() !== "cancelled"
  );

  const deliveredParcels = parcels.filter(
    (p) => p.deliveryStatus?.toLowerCase() === "delivered"
  );

  const getProgressPercentage = (status) => {
    const normalizedStatus = status?.toLowerCase() || "";
    if (normalizedStatus.includes("pending") || normalizedStatus.includes("pickup")) {
      return 33;
    }
    if (normalizedStatus.includes("transit") || normalizedStatus.includes("picked")) {
      return 66;
    }
    if (normalizedStatus.includes("delivered")) {
      return 100;
    }
    return 0;
  };

  const getStatusIcon = (status) => {
    const normalizedStatus = status?.toLowerCase() || "";
    if (normalizedStatus.includes("delivered")) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    if (normalizedStatus.includes("transit")) {
      return <Package className="w-5 h-5 text-blue-600" />;
    }
    if (normalizedStatus.includes("cancelled")) {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }
    return <Clock className="w-5 h-5 text-yellow-600" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
        <button
          onClick={refetch}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-blue-700 font-medium">Active Orders</p>
              <p className="text-2xl font-bold text-blue-900">
                {activeParcels.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-green-700 font-medium">Delivered</p>
              <p className="text-2xl font-bold text-green-900">
                {deliveredParcels.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-sm text-purple-700 font-medium">
                Total Spent
              </p>
              <p className="text-2xl font-bold text-purple-900">
                ${payments.reduce((sum, p) => sum + (p.amount || 0), 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Orders */}
      {activeParcels.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            📦 Track Your Active Orders
          </h3>
          <div className="space-y-4">
            {activeParcels.map((order) => (
              <div
                key={order._id}
                className="border-2 border-indigo-100 rounded-lg p-5 hover:shadow-lg transition"
              >
                {/* Order Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(order.deliveryStatus)}
                    <div>
                      <h4 className="font-semibold text-lg">
                        {order.parcelName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Order #{order._id?.slice(-8)}
                      </p>
                      {order.trackingId && (
                        <p className="text-xs text-gray-500 mt-1">
                          Tracking: {order.trackingId}
                        </p>
                      )}
                    </div>
                  </div>
                  <StatusBadge status={order.deliveryStatus} />
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-2">
                    <span className="flex items-center gap-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          getProgressPercentage(order.deliveryStatus) >= 33
                            ? "bg-indigo-600"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      Order Placed
                    </span>
                    <span className="flex items-center gap-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          getProgressPercentage(order.deliveryStatus) >= 66
                            ? "bg-indigo-600"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      In Transit
                    </span>
                    <span className="flex items-center gap-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          getProgressPercentage(order.deliveryStatus) === 100
                            ? "bg-indigo-600"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      Delivered
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${getProgressPercentage(order.deliveryStatus)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Addresses */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-green-700 mb-1">
                          PICKUP FROM
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {order.senderName}
                        </p>
                        <p className="text-xs text-gray-600 break-words">
                          {order.senderAddress}
                        </p>
                        <p className="text-xs text-gray-600">
                          {order.senderDistrict}, {order.senderRegion}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-red-700 mb-1">
                          DELIVER TO
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {order.receiverName}
                        </p>
                        <p className="text-xs text-gray-600 break-words">
                          {order.receiverAddress}
                        </p>
                        <p className="text-xs text-gray-600">
                          {order.receiverDistrict}, {order.receiverRegion}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="flex flex-wrap justify-between items-center text-sm pt-3 border-t gap-2">
                  <div className="flex gap-4">
                    <span className="text-gray-600">
                      Weight:{" "}
                      <span className="font-semibold text-gray-900">
                        {order.parcelWeight} kg
                      </span>
                    </span>
                    <span className="text-gray-600">
                      Type:{" "}
                      <span className="font-semibold text-gray-900 capitalize">
                        {order.parcelType?.replace("-", " ")}
                      </span>
                    </span>
                  </div>
                  <span className="text-lg font-bold text-indigo-600">
                    ${order.cost}
                  </span>
                </div>

                {/* Payment Status */}
                {order.paymentStatus && (
                  <div className="mt-3 pt-3 border-t">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.paymentStatus === "paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      Payment: {order.paymentStatus}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delivered Orders History */}
      {deliveredParcels.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            ✅ Delivery History
          </h3>
          <div className="space-y-3">
            {deliveredParcels.slice(0, 5).map((order) => (
              <div
                key={order._id}
                className="flex justify-between items-center p-4 bg-green-50 border border-green-200 rounded-lg hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {order.parcelName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.receiverName} • {order.receiverDistrict}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {order.trackingId}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${order.cost}</p>
                  <p className="text-xs text-gray-500">Delivered</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {parcels.length === 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <EmptyState
            icon={Package}
            title="No orders yet"
            description="You haven't placed any orders. Start by creating a new delivery request!"
            action={
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Place New Order
              </button>
            }
          />
        </div>
      )}

      {/* Payment History */}
      {payments.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">💳 Payment History</h3>
          <div className="space-y-2">
            {payments.slice(0, 5).map((payment) => (
              <div
                key={payment._id}
                className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {payment.parcelName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(payment.paidAt).toLocaleDateString()} •{" "}
                    {payment.trackingId}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${payment.amount}
                  </p>
                  <p className="text-xs text-green-600">Paid</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
