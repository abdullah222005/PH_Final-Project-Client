import React, { useState } from "react";
import { Package, Truck, DollarSign, Clock } from "lucide-react";
import { useDashboardStats, useRiders } from "../hooks/useData";
import {
  StatCard,
  StatusBadge,
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
  Table,
  ConfirmDialog,
} from "./SharedComponents";

const AdminDashboard = ({ currentUser }) => {
  const { stats, loading, error, refetch } = useDashboardStats(
    currentUser.email,
    "admin"
  );
  const {
    riders,
    loading: ridersLoading,
    updateRiderStatus,
  } = useRiders();

  const [selectedRider, setSelectedRider] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    riderId: null,
    status: null,
  });

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  const handleRiderStatusChange = async (riderId, newStatus) => {
    const success = await updateRiderStatus(riderId, newStatus);
    if (success) {
      setConfirmDialog({ isOpen: false, riderId: null, status: null });
    }
  };

  const recentOrders = stats?.parcels?.slice(0, 10) || [];
  const activeDrivers = riders.filter(
    (r) => r.applicationStatus === "Approved"
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        <button
          onClick={refetch}
          className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Refresh Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Package}
          title="Total Orders"
          value={stats?.totalOrders || 0}
          color="blue"
          loading={loading}
        />
        <StatCard
          icon={Truck}
          title="Active Drivers"
          value={stats?.activeRiders || 0}
          color="green"
          loading={loading}
        />
        <StatCard
          icon={DollarSign}
          title="Total Revenue"
          value={`$${stats?.totalRevenue || 0}`}
          color="indigo"
          loading={loading}
        />
        <StatCard
          icon={Clock}
          title="Avg. Delivery"
          value={stats?.avgDeliveryTime || "N/A"}
          color="orange"
          loading={loading}
        />
      </div>

      {/* Order Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">
            Pending Pickup
          </h4>
          <p className="text-3xl font-bold text-yellow-900">
            {stats?.pendingOrders || 0}
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2">In Transit</h4>
          <p className="text-3xl font-bold text-blue-900">
            {stats?.inTransitOrders || 0}
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-800 mb-2">Delivered</h4>
          <p className="text-3xl font-bold text-green-900">
            {stats?.deliveredOrders || 0}
          </p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        {recentOrders.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No orders yet"
            description="Orders will appear here once customers start placing them."
          />
        ) : (
          <Table
            headers={[
              "Order ID",
              "Customer",
              "Pickup Address",
              "Delivery Address",
              "Status",
              "Amount",
              "Tracking ID",
            ]}
            loading={loading}
          >
            {recentOrders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  #{order._id?.slice(-6)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  <div>
                    <p className="font-medium">{order.senderName}</p>
                    <p className="text-xs text-gray-500">{order.senderEmail}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  <div className="max-w-xs truncate">
                    {order.senderAddress}, {order.senderDistrict}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  <div className="max-w-xs truncate">
                    {order.receiverAddress}, {order.receiverDistrict}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                  <StatusBadge status={order.deliveryStatus} />
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                  ${order.cost}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {order.trackingId || "N/A"}
                </td>
              </tr>
            ))}
          </Table>
        )}
      </div>

      {/* Delivery Partners Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Delivery Partners</h3>

        {/* Pending Applications */}
        {riders.filter((r) => r.applicationStatus === "Pending").length > 0 && (
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-700 mb-3">
              Pending Applications ({riders.filter((r) => r.applicationStatus === "Pending").length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {riders
                .filter((r) => r.applicationStatus === "Pending")
                .map((rider) => (
                  <div
                    key={rider._id}
                    className="border border-yellow-200 bg-yellow-50 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{rider.name}</h4>
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1 mb-3">
                      <p>📧 {rider.email}</p>
                      <p>📞 {rider.phone}</p>
                      <p>🏍️ {rider.bikeModel}</p>
                      <p>📍 {rider.district}, {rider.region}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setConfirmDialog({
                            isOpen: true,
                            riderId: rider._id,
                            status: "Approved",
                            riderName: rider.name,
                          })
                        }
                        className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          setConfirmDialog({
                            isOpen: true,
                            riderId: rider._id,
                            status: "Rejected",
                            riderName: rider.name,
                          })
                        }
                        className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Active Riders */}
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-3">
            Active Riders ({activeDrivers.length})
          </h4>
          {activeDrivers.length === 0 ? (
            <EmptyState
              icon={Truck}
              title="No active riders"
              description="Approved riders will appear here."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeDrivers.map((rider) => (
                <div key={rider._id} className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{rider.name}</h4>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>📧 {rider.email}</p>
                    <p>📞 {rider.phone}</p>
                    <p>🏍️ {rider.bikeModel}</p>
                    <p>📍 {rider.district}, {rider.region}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() =>
          setConfirmDialog({ isOpen: false, riderId: null, status: null })
        }
        onConfirm={() =>
          handleRiderStatusChange(confirmDialog.riderId, confirmDialog.status)
        }
        title={`${confirmDialog.status} Rider Application`}
        message={`Are you sure you want to ${confirmDialog.status?.toLowerCase()} ${confirmDialog.riderName}'s application?`}
        confirmText={confirmDialog.status}
      />
    </div>
  );
};

export default AdminDashboard;
