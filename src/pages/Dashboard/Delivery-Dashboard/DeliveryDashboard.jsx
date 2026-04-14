import React, { useState } from "react";
import { Package, DollarSign, Clock, MapPin, CheckCircle } from "lucide-react";
import { useParcels, usePayments } from "../hooks/useData";
import {
  StatCard,
  StatusBadge,
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
  ConfirmDialog,
} from "./SharedComponents";

const DeliveryDashboard = ({ currentUser }) => {
  const { parcels, loading, error, updateParcelStatus, refetch } = useParcels();
  const { payments } = usePayments(currentUser.email);

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    parcelId: null,
    action: null,
  });

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  // Filter parcels for delivery partner
  // Show pending parcels (available to accept) and parcels assigned to this rider
  const availableParcels = parcels.filter(
    (p) => p.deliveryStatus?.toLowerCase() === "pending-pickup" && p.paymentStatus === "paid"
  );

  const myActiveParcels = parcels.filter(
    (p) =>
      p.assignedRider === currentUser.email &&
      (p.deliveryStatus?.toLowerCase().includes("transit") ||
        p.deliveryStatus?.toLowerCase().includes("picked"))
  );

  const myDeliveredParcels = parcels.filter(
    (p) =>
      p.assignedRider === currentUser.email &&
      p.deliveryStatus?.toLowerCase() === "delivered"
  );

  // Calculate today's stats (you can enhance this with actual date filtering)
  const todayDeliveries = myDeliveredParcels.length;
  const todayEarnings = myDeliveredParcels.reduce(
    (sum, p) => sum + (p.cost || 0) * 0.1,
    0
  ); // Assuming 10% commission

  const handleAcceptOrder = async (parcelId) => {
    // You'll need to update your backend to handle rider assignment
    // For now, we'll just update the status
    const success = await updateParcelStatus(parcelId, "in-transit");
    if (success) {
      setConfirmDialog({ isOpen: false, parcelId: null, action: null });
    }
  };

  const handleMarkDelivered = async (parcelId) => {
    const success = await updateParcelStatus(parcelId, "delivered");
    if (success) {
      setConfirmDialog({ isOpen: false, parcelId: null, action: null });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Delivery Dashboard</h2>
        <button
          onClick={refetch}
          className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Refresh Orders
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={Package}
          title="Active Deliveries"
          value={myActiveParcels.length}
          color="green"
        />
        <StatCard
          icon={CheckCircle}
          title="Completed Today"
          value={todayDeliveries}
          color="blue"
        />
        <StatCard
          icon={DollarSign}
          title="Today's Earnings"
          value={`$${todayEarnings.toFixed(2)}`}
          color="purple"
        />
      </div>

      {/* Active Deliveries */}
      {myActiveParcels.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-700">
            🚚 Active Deliveries ({myActiveParcels.length})
          </h3>
          <div className="space-y-3">
            {myActiveParcels.map((order) => (
              <div
                key={order._id}
                className="border-2 border-blue-200 bg-blue-50 rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">
                      {order.parcelName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Order #{order._id?.slice(-8)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Tracking: {order.trackingId}
                    </p>
                  </div>
                  <StatusBadge status={order.deliveryStatus} />
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-green-700">Pickup:</p>
                      <p className="text-gray-700">
                        {order.senderAddress}, {order.senderDistrict},{" "}
                        {order.senderRegion}
                      </p>
                      <p className="text-xs text-gray-500">
                        Contact: {order.senderPhone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-red-700">Delivery:</p>
                      <p className="text-gray-700">
                        {order.receiverAddress}, {order.receiverDistrict},{" "}
                        {order.receiverRegion}
                      </p>
                      <p className="text-xs text-gray-500">
                        Contact: {order.receiverPhone}
                      </p>
                    </div>
                  </div>

                  {order.deliveryInstruction && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-2 text-sm">
                      <p className="font-medium text-yellow-800">
                        Delivery Note:
                      </p>
                      <p className="text-yellow-700">{order.deliveryInstruction}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-3 border-t">
                  <div>
                    <span className="text-sm text-gray-600">Weight: </span>
                    <span className="font-semibold">{order.parcelWeight} kg</span>
                    <span className="text-sm text-gray-600 ml-4">
                      Earn: ${(order.cost * 0.1).toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setConfirmDialog({
                        isOpen: true,
                        parcelId: order._id,
                        action: "deliver",
                        orderInfo: order,
                      })
                    }
                    className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark Delivered
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Orders */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">
          📦 Available Orders ({availableParcels.length})
        </h3>
        {availableParcels.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No available orders"
            description="New delivery requests will appear here. Check back soon!"
          />
        ) : (
          <div className="space-y-3">
            {availableParcels.map((order) => (
              <div
                key={order._id}
                className="border rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">
                      {order.parcelName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Order #{order._id?.slice(-8)}
                    </p>
                  </div>
                  <StatusBadge status={order.deliveryStatus} />
                </div>

                <div className="grid md:grid-cols-2 gap-3 mb-4">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-green-700">From:</p>
                      <p className="text-gray-700">
                        {order.senderDistrict}, {order.senderRegion}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-red-700">To:</p>
                      <p className="text-gray-700">
                        {order.receiverDistrict}, {order.receiverRegion}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t">
                  <div className="space-x-4">
                    <span className="text-sm text-gray-600">
                      Weight: <span className="font-semibold">{order.parcelWeight} kg</span>
                    </span>
                    <span className="font-semibold text-green-600">
                      Earn: ${(order.cost * 0.1).toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setConfirmDialog({
                        isOpen: true,
                        parcelId: order._id,
                        action: "accept",
                        orderInfo: order,
                      })
                    }
                    className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700"
                  >
                    Accept Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Deliveries */}
      {myDeliveredParcels.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            ✅ Completed Deliveries ({myDeliveredParcels.length})
          </h3>
          <div className="space-y-2">
            {myDeliveredParcels.slice(0, 5).map((order) => (
              <div
                key={order._id}
                className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <div>
                  <p className="font-medium">{order.parcelName}</p>
                  <p className="text-sm text-gray-600">
                    {order.receiverDistrict}, {order.receiverRegion}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">
                    +${(order.cost * 0.1).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">{order.trackingId}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() =>
          setConfirmDialog({ isOpen: false, parcelId: null, action: null })
        }
        onConfirm={() => {
          if (confirmDialog.action === "accept") {
            handleAcceptOrder(confirmDialog.parcelId);
          } else if (confirmDialog.action === "deliver") {
            handleMarkDelivered(confirmDialog.parcelId);
          }
        }}
        title={
          confirmDialog.action === "accept"
            ? "Accept Delivery Order"
            : "Mark as Delivered"
        }
        message={
          confirmDialog.action === "accept"
            ? `Accept delivery for ${confirmDialog.orderInfo?.parcelName}? You'll earn $${(confirmDialog.orderInfo?.cost * 0.1).toFixed(2)}`
            : `Confirm that you've delivered ${confirmDialog.orderInfo?.parcelName}?`
        }
        confirmText={confirmDialog.action === "accept" ? "Accept" : "Confirm Delivery"}
      />
    </div>
  );
};

export default DeliveryDashboard;
