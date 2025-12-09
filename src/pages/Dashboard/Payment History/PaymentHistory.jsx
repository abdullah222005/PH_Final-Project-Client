import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: payments = []} = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data;
        }
    })

  return (
    <div className=" max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Payment History</h2>

      <div className="overflow-x-auto rounded-box border border-base-content/5 p-4 bg-secondary">
        <table className="table table-pin-rows table-pin-cols text-center shadow-2xl bg-white">
          {/* Table Head */}
          <thead className="bg-gray-100 text-lg">
            <tr>
              <th>SL</th>
              <th>Parcel Info</th>
              <th>Recipient Info</th>
              <th>Tracking Number</th>
              <th>Payment Info</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="text-[16px]">
            {payments.map((p, index) => (
              <tr key={p._id} className="hover">
                <td>
                  <p className="font-semibold">{index+1}</p>
                </td>
                {/* Parcel Info */}
                <td>
                  <p className="font-semibold">{p.parcelName}</p>
                </td>

                {/* Recipient Info (Load from your parcel DB using parcelId if needed) */}
                <td>
                  <p className="font-semibold">{p.recipientName}</p>
                  <p className="text-sm">{p.recipientAddress}</p>
                  <p className="text-sm">{p.recipientPhone}</p>
                </td>

                {/* Tracking */}
                <td>{p.trackingId}</td>

                {/* Payment Info */}
                <td>
                  <p className="font-semibold">
                    {p.currency === "usd" ? `$${p.amount}` : `৳${p.amount}`} (
                    {p.paymentStatus})
                  </p>
                </td>

                {/* Action */}
                <td>
                  <button className="btn btn-sm bg-gray-100">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
