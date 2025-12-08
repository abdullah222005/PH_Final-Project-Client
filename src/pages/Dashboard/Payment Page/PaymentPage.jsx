import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Loader1 } from "../../../components/Loader/Loader";
import {
  Package,
  MapPin,
  User,
  Mail,
  Phone,
  Home,
  Calendar,
  Truck,
  FileText,
  CreditCard,
} from "lucide-react";
import toast from "react-hot-toast";

const PaymentPage = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    isLoading,
    data: parcel,
    error,
  } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader1 />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 my-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            Error Loading Parcel
          </h2>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!parcel) {
    return (
      <div className="max-w-4xl mx-auto p-6 my-10">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-yellow-700">
            Parcel Not Found
          </h2>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };
    try {
      const res = await axiosSecure.post(
        "/zapshift-checkout-session",
        paymentInfo
      );
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 my-6 md:my-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Payment Checkout
        </h1>
        <p className="text-gray-600">
          Review your parcel details and complete the payment
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Parcel Information */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <Package className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Parcel Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500 block mb-1">
                  Parcel Name
                </label>
                <p className="text-lg font-semibold text-gray-800">
                  {parcel.parcelName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 block mb-1">
                  Weight
                </label>
                <p className="text-lg font-semibold text-gray-800">
                  {parcel.parcelWeight} KG
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 block mb-1">
                  Parcel Type
                </label>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    parcel.parcelType === "document"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {parcel.parcelType === "document"
                    ? "Document"
                    : "Non-Document"}
                </span>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 block mb-1">
                  Booking Date
                </label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <p className="text-sm text-gray-700">
                    {formatDate(parcel.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sender Details */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <User className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Sender Details
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <label className="text-sm font-medium text-gray-500 block">
                    Name
                  </label>
                  <p className="text-gray-800 font-medium">
                    {parcel.senderName}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <label className="text-sm font-medium text-gray-500 block">
                    Email
                  </label>
                  <p className="text-gray-800">{parcel.senderEmail}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <label className="text-sm font-medium text-gray-500 block">
                    Phone
                  </label>
                  <p className="text-gray-800">{parcel.senderPhone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Home className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <label className="text-sm font-medium text-gray-500 block">
                    Address
                  </label>
                  <p className="text-gray-800">{parcel.senderAddress}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <label className="text-sm font-medium text-gray-500 block">
                    Location
                  </label>
                  <p className="text-gray-800">
                    {parcel.senderDistrict}, {parcel.senderRegion}
                  </p>
                </div>
              </div>
              {parcel.pickupInstruction && (
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <label className="text-sm font-medium text-gray-500 block">
                      Pickup Instruction
                    </label>
                    <p className="text-gray-800">{parcel.pickupInstruction}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Receiver Details */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <Truck className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Receiver Details
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <label className="text-sm font-medium text-gray-500 block">
                    Name
                  </label>
                  <p className="text-gray-800 font-medium">
                    {parcel.receiverName}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <label className="text-sm font-medium text-gray-500 block">
                    Email
                  </label>
                  <p className="text-gray-800">{parcel.receiverEmail}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <label className="text-sm font-medium text-gray-500 block">
                    Phone
                  </label>
                  <p className="text-gray-800">{parcel.receiverPhone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Home className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <label className="text-sm font-medium text-gray-500 block">
                    Address
                  </label>
                  <p className="text-gray-800">{parcel.receiverAddress}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <label className="text-sm font-medium text-gray-500 block">
                    Location
                  </label>
                  <p className="text-gray-800">
                    {parcel.receiverDistrict}, {parcel.receiverRegion}
                  </p>
                </div>
              </div>
              {parcel.deliveryInstruction && (
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <label className="text-sm font-medium text-gray-500 block">
                      Delivery Instruction
                    </label>
                    <p className="text-gray-800">
                      {parcel.deliveryInstruction}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Payment Summary - Right Side (Sticky) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 sticky top-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <CreditCard className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-gray-800">
                Payment Summary
              </h2>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Parcel Name</span>
                <span className="font-medium text-gray-800">
                  {parcel.parcelName}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Weight</span>
                <span className="font-medium text-gray-800">
                  {parcel.parcelWeight} KG
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Type</span>
                <span className="font-medium text-gray-800 capitalize">
                  {parcel.parcelType}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Route</span>
                <span className="font-medium text-gray-800 text-right text-sm">
                  {parcel.senderDistrict} → {parcel.receiverDistrict}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-700">
                    Total Amount
                  </span>
                  <span className="text-3xl font-bold text-primary">
                    {parcel.cost} ৳
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <CreditCard className="w-5 h-5" />
              Proceed to Payment
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Go Back
            </button>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                🔒 Secure payment powered by Stripe
              </p>
              <p className="text-xs text-gray-500 text-center mt-2">
                ⏰ Pickup Time: 4pm–7pm approx.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
