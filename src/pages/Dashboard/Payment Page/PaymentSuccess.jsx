import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, Package, Home, Receipt, Loader } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get('session_id');
  const axiosSecure = useAxiosSecure();
  console.log(sessionId);
  

  useEffect(() => {
    if(sessionId){
      // Match the backend endpoint URL
      axiosSecure.patch(`/verify-payment-success?session_id=${sessionId}`)
        .then(res=> {
          console.log('Payment verification response:', res.data);
          if(res.data.success){
            setPaymentInfo({
              transactionId: res.data.transactionId,
              trackingId: res.data.trackingId,
            })
          } else {
            console.error('Payment verification failed:', res.data.message);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Payment verification error:', error);
          setLoading(false);
        })
    } else {
      setLoading(false);
    }
  }, [sessionId, axiosSecure]);

  if(loading){
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if(!sessionId || !paymentInfo){
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Invalid Payment Session</h2>
          <p className="text-gray-600 mb-6">Unable to verify payment information.</p>
          <button
            onClick={() => navigate('/dashboard/my-parcels')}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
          >
            Go to My Parcels
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-55"></div>
              <div className="relative bg-green-500 rounded-full p-6">
                <CheckCircle
                  className="w-16 h-16 md:w-20 md:h-20 text-white"
                  strokeWidth={2.5}
                />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your payment has been processed successfully. Your parcel booking is
            confirmed!
          </p>

          {/* Transaction Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Receipt className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-700">
                Transaction Details
              </h3>
            </div>
            <div className="space-y-3 text-left max-w-md mx-auto">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Status</span>
                <span className="font-semibold text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Confirmed
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium text-gray-800">Stripe</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-medium text-gray-800 text-sm break-all">
                  {paymentInfo.transactionId || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Tracking ID</span>
                <span className="font-medium text-gray-800 font-mono">
                  {paymentInfo.trackingId || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Date</span>
                <span className="font-medium text-gray-800">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              What's Next?
            </h3>
            <ul className="text-left text-gray-700 space-y-2 max-w-md mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>You'll receive a confirmation email shortly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Your parcel will be picked up between 4pm–7pm</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Track your parcel status in your dashboard</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/dashboard/my-parcels")}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <Package className="w-5 h-5" />
              View My Parcels
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              <Home className="w-5 h-5" />
              Go to Home
            </button>
          </div>

          {/* Support Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help? Contact our support team at{" "}
              
                href="mailto:support@zapshift.com"
                className="text-primary hover:underline"
              <a>
                support@zapshift.com
              </a>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Thank you for choosing Zap Shift! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;