import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit, FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";
import { PiListMagnifyingGlassDuotone } from "react-icons/pi";
import { TbTrashXFilled } from "react-icons/tb";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // State Management
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid or table
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, paid, unpaid
  const [filterDelivery, setFilterDelivery] = useState("all"); // all, pending, delivered
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, cost-high, cost-low
  const [showFilters, setShowFilters] = useState(false);

  const {
    data: parcels = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // Filter, Search, and Sort Logic
  const filteredAndSortedParcels = useMemo(() => {
    let result = [...parcels];

    // Search
    if (searchTerm) {
      result = result.filter(
        (parcel) =>
          parcel.parcelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          parcel.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          parcel.receiverName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by payment status
    if (filterStatus !== "all") {
      result = result.filter((parcel) => parcel.paymentStatus === filterStatus);
    }

    // Filter by delivery status
    if (filterDelivery !== "all") {
      result = result.filter(
        (parcel) => parcel.deliveryStatus === filterDelivery,
      );
    }

    // Sort
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "cost-high":
        result.sort((a, b) => b.cost - a.cost);
        break;
      case "cost-low":
        result.sort((a, b) => a.cost - b.cost);
        break;
      default:
        break;
    }

    return result;
  }, [parcels, searchTerm, filterStatus, filterDelivery, sortBy]);

  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "unpaid":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "delivered":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Parcels</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all your parcels ({filteredAndSortedParcels.length}{" "}
            of {parcels.length})
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`btn btn-sm ${viewMode === "grid" ? "btn-primary text-black" : "btn-outline"}`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`btn btn-sm ${viewMode === "table" ? "btn-primary text-black" : "btn-outline"}`}
          >
            Table
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className="absolute z-50 left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by parcel name, tracking ID, or receiver..."
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-outline gap-2"
          >
            <FaFilter />
            Filters
            {(filterStatus !== "all" || filterDelivery !== "all") && (
              <span className="badge badge-primary text-black badge-sm">
                Active
              </span>
            )}
          </button>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <FaSortAmountDown className="text-gray-400" />
            <select
              className="select select-bordered"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="cost-high">Cost: High to Low</option>
              <option value="cost-low">Cost: Low to High</option>
            </select>
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text font-medium">Payment Status</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid Only</option>
                <option value="unPaid">Unpaid Only</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Delivery Status</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filterDelivery}
                onChange={(e) => setFilterDelivery(e.target.value)}
              >
                <option value="all">All Deliveries</option>
                <option value="pending">Pending</option>
                <option value="pending-pickup">Pending Pickup</option>
                <option value="in_transit">In Transit</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            {/* Clear Filters */}
            {(filterStatus !== "all" || filterDelivery !== "all") && (
              <div className="md:col-span-2">
                <button
                  onClick={() => {
                    setFilterStatus("all");
                    setFilterDelivery("all");
                  }}
                  className="btn btn-sm btn-ghost"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredAndSortedParcels.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No parcels found
          </h3>
          <p className="text-gray-500">
            {searchTerm || filterStatus !== "all" || filterDelivery !== "all"
              ? "Try adjusting your search or filters"
              : "You haven't created any parcels yet"}
          </p>
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && filteredAndSortedParcels.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedParcels.map((parcel) => (
            <ParcelCard
              key={parcel._id}
              parcel={parcel}
              onDelete={handleParcelDelete}
              onViewDetails={setSelectedParcel}
              getStatusColor={getStatusColor}
            />
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" && filteredAndSortedParcels.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead className="bg-base-200">
                <tr>
                  <th>Tracking ID</th>
                  <th>Parcel Name</th>
                  <th>Type</th>
                  <th>Weight</th>
                  <th>Cost</th>
                  <th>Payment</th>
                  <th>Delivery</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedParcels.map((parcel) => (
                  <tr key={parcel._id} className="hover">
                    <td className="font-mono text-sm">{parcel.trackingId}</td>
                    <td className="font-medium">{parcel.parcelName}</td>
                    <td>{parcel.parcelType}</td>
                    <td>{parcel.parcelWeight} kg</td>
                    <td className="font-semibold">৳{parcel.cost}</td>
                    <td>
                      <span
                        className={`badge badge-sm ${getStatusColor(
                          parcel.paymentStatus,
                        )}`}
                      >
                        {parcel.paymentStatus
                          .charAt(0)
                          .toUpperCase() + parcel.paymentStatus.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge badge-sm ${getStatusColor(
                          parcel.deliveryStatus
                            .split("-")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                            )
                            .join(" ") || "pending",
                        )}`}
                      >
                        {parcel.deliveryStatus
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1),
                          )
                          .join(" ") || "pending"}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <button
                          className="btn btn-xs btn-ghost tooltip"
                          data-tip="View"
                          onClick={() => setSelectedParcel(parcel)}
                        >
                          <PiListMagnifyingGlassDuotone className="text-lg" />
                        </button>
                        <button
                          className="btn btn-xs btn-ghost tooltip"
                          data-tip="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-xs btn-ghost text-error tooltip"
                          data-tip="Delete"
                          onClick={() => handleParcelDelete(parcel._id)}
                        >
                          <TbTrashXFilled />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedParcel && (
        <ParcelDetailsModal
          parcel={selectedParcel}
          onClose={() => setSelectedParcel(null)}
          getStatusColor={getStatusColor}
        />
      )}
    </div>
  );
};

// Parcel Card Component
const ParcelCard = ({ parcel, onDelete, onViewDetails, getStatusColor }) => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow border border-base-200">
      <div className="card-body p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-lg truncate">{parcel.parcelName}</h3>
            <p className="text-xs text-gray-500 font-mono">
              {parcel.trackingId}
            </p>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-xs">
              ⋮
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10"
            >
              <li>
                <button onClick={() => onViewDetails(parcel)}>
                  <PiListMagnifyingGlassDuotone /> View Details
                </button>
              </li>
              <li>
                <button>
                  <FaEdit /> Edit Parcel
                </button>
              </li>
              <li>
                <button
                  onClick={() => onDelete(parcel._id)}
                  className="text-error"
                >
                  <TbTrashXFilled /> Delete
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Type:</span>
            <span className="font-medium">
              {parcel.parcelType
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Weight:</span>
            <span className="font-medium">{parcel.parcelWeight} kg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cost:</span>
            <span className="font-bold text-primary">৳{parcel.cost}</span>
          </div>
        </div>

        {/* Receiver Info */}
        <div className="mt-3 p-2 bg-base-200 rounded-lg text-sm">
          <p className="text-gray-600 text-xs mb-1">Receiver</p>
          <p className="font-medium truncate">{parcel.receiverName}</p>
          <p className="text-xs text-gray-500 truncate">
            {parcel.receiverDistrict}
          </p>
        </div>

        {/* Status Badges */}
        <div className="flex gap-2 mt-3">
          <span
            className={`badge badge-sm flex-1 ${getStatusColor(parcel.paymentStatus)}`}
          >
            {parcel.paymentStatus.charAt(0).toUpperCase() +
              parcel.paymentStatus.slice(1)}
          </span>
          <span
            className={`badge badge-sm flex-1 ${getStatusColor(
              parcel.deliveryStatus
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ") || "pending",
            )}`}
          >
            {parcel.deliveryStatus
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ") || "pending"}
          </span>
        </div>

        {/* Action Button */}
        {parcel.paymentStatus !== "paid" && (
          <Link to={`/dashboard/payment/${parcel._id}`} className="mt-3">
            <button className="btn btn-primary text-black btn-sm w-full">
              Pay Now
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

// Details Modal Component
const ParcelDetailsModal = ({ parcel, onClose, getStatusColor }) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-2xl">{parcel.parcelName}</h3>
            <p className="text-sm text-gray-500 font-mono mt-1">
              {parcel.trackingId}
            </p>
          </div>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            <MdClose className="text-xl" />
          </button>
        </div>

        {/* Status Badges */}
        <div className="flex gap-2 mb-6">
          <span className={`badge ${getStatusColor(parcel.paymentStatus)}`}>
            Payment: {parcel.paymentStatus}
          </span>
          <span
            className={`badge ${getStatusColor(parcel.deliveryStatus || "pending")}`}
          >
            Delivery: {parcel.deliveryStatus || "pending"}
          </span>
        </div>

        {/* Parcel Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <InfoCard title="Parcel Details">
            <InfoRow label="Type" value={parcel.parcelType} />
            <InfoRow label="Weight" value={`${parcel.parcelWeight} kg`} />
            <InfoRow
              label="Cost"
              value={`৳${parcel.cost}`}
              className="font-bold text-primary"
            />
            <InfoRow
              label="Created At"
              value={new Date(parcel.createdAt).toLocaleString()}
            />
          </InfoCard>
        </div>

        {/* Sender and Receiver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <InfoCard title="Sender Information">
            <InfoRow label="Name" value={parcel.senderName} />
            <InfoRow label="Email" value={parcel.senderEmail} />
            <InfoRow label="Phone" value={parcel.senderPhone} />
            <InfoRow label="Address" value={parcel.senderAddress} />
            <InfoRow label="Region" value={parcel.senderRegion} />
            <InfoRow label="District" value={parcel.senderDistrict} />
            {parcel.pickupInstruction && (
              <InfoRow label="Pickup Note" value={parcel.pickupInstruction} />
            )}
          </InfoCard>

          <InfoCard title="Receiver Information">
            <InfoRow label="Name" value={parcel.receiverName} />
            <InfoRow label="Email" value={parcel.receiverEmail} />
            <InfoRow label="Phone" value={parcel.receiverPhone} />
            <InfoRow label="Address" value={parcel.receiverAddress} />
            <InfoRow label="Region" value={parcel.receiverRegion} />
            <InfoRow label="District" value={parcel.receiverDistrict} />
            {parcel.deliveryInstruction && (
              <InfoRow
                label="Delivery Note"
                value={parcel.deliveryInstruction}
              />
            )}
          </InfoCard>
        </div>

        {/* Actions */}
        <div className="flex gap-2 justify-end">
          {parcel.paymentStatus !== "paid" && (
            <Link to={`/dashboard/payment/${parcel._id}`}>
              <button className="btn btn-primary">Pay Now</button>
            </Link>
          )}
          <button className="btn btn-outline">Edit Parcel</button>
          <button onClick={onClose} className="btn">
            Close
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

// Helper Components
const InfoCard = ({ title, children }) => (
  <div className="card bg-base-200 shadow-sm">
    <div className="card-body p-4">
      <h4 className="font-semibold text-lg mb-3 border-b pb-2">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  </div>
);

const InfoRow = ({ label, value, className = "" }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-600">{label}:</span>
    <span className={`font-medium text-right ${className}`}>{value}</span>
  </div>
);

export default MyParcels;
