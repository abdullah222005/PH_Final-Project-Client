import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircle, Home, RefreshCw, HelpCircle } from "lucide-react";

const PaymentFailure = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    // Navigate back to payment or parcel list
    navigate(-2); // Go back 2 steps to the payment page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Failure Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-400 rounded-full animate-pulse opacity-75"></div>
              <div className="relative bg-red-500 rounded-full p-6">
                <XCircle
                  className="w-16 h-16 md:w-20 md:h-20 text-white"
                  strokeWidth={2.5}
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Payment Failed
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            We couldn't process your payment. Your parcel booking was not
            completed.
          </p>

          {/* Error Details */}
          <div className="bg-red-50 rounded-lg p-6 mb-8 border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-3">
              What went wrong?
            </h3>
            <p className="text-gray-700 mb-4">
              Your payment was cancelled or declined. This could happen for
              several reasons:
            </p>
            <ul className="text-left text-gray-700 space-y-2 max-w-md mx-auto text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Payment was cancelled by you</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Insufficient funds in your account</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Card declined by your bank</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Technical issue during payment processing</span>
              </li>
            </ul>
          </div>

          {/* What to do next */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              What can you do?
            </h3>
            <ul className="text-left text-gray-700 space-y-2 max-w-md mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">→</span>
                <span>Try again with a different payment method</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">→</span>
                <span>Check your card details and try again</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">→</span>
                <span>Contact your bank if the issue persists</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">→</span>
                <span>Reach out to our support team for assistance</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            <button
              onClick={() => navigate("/dashboard/my-parcels")}
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              <Home className="w-5 h-5" />
              My Parcels
            </button>
          </div>

          {/* Support Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <HelpCircle className="w-5 h-5 text-gray-500" />
              <p className="text-sm font-semibold text-gray-700">Need Help?</p>
            </div>
            <p className="text-sm text-gray-500">
              Contact our support team at{" "}
              <a
                href="mailto:support@zapshift.com"
                className="text-primary hover:underline"
              >
                support@zapshift.com
              </a>{" "}
              or call{" "}
              <a
                href="tel:+8801234567890"
                className="text-primary hover:underline"
              >
                +880 123-456-7890
              </a>
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            🔒 Your payment information is secure and was not stored
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
