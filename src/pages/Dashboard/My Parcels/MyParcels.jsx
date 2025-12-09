import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { PiListMagnifyingGlassDuotone } from "react-icons/pi";
import { TbTrashXFilled } from "react-icons/tb";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [selectedParcel, setSelectedParcel] = useState(null);

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

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

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-4xl font-semibold my-8">
        All of my parcels: {parcels.length}
      </h1>

      <div className="overflow-x-auto rounded-box border border-base-content/5 p-4 bg-secondary">
        <table className="table table-pin-rows table-pin-cols text-center shadow-2xl bg-white">
          <thead className="text-lg">
            <tr>
              <th>SL</th>
              <th>Parcel Name</th>
              <th>Parcel Type</th>
              <th>Parcel Weight</th>
              <th>Cost</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="text-[16px]">
            {parcels.map((parcel, index) => (
              <tr className="hover:bg-base-300" key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.parcelType}</td>
                <td>{parcel.parcelWeight} kg</td>
                <td>{parcel.cost} tk</td>

                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <button
                      disabled
                      className="btn btn-square bg-primary text-white"
                    >
                      Paid
                    </button>
                  ) : (
                    <Link to={`/dashboard/payment/${parcel._id}`}>
                      <button className="btn btn-square bg-red-300">Pay</button>
                    </Link>
                  )}
                </td>

                <td>---</td>

                <td>
                  <button
                    className="btn btn-square hover:bg-primary tooltip"
                    data-tip="Edit Parcel"
                  >
                    <FaEdit />
                  </button>

                  {/* VIEW DETAILS BUTTON */}
                  <label
                    htmlFor="detailsModal"
                    className="btn btn-square hover:bg-primary mx-3 tooltip"
                    data-tip="View Parcel Details"
                    onClick={() => setSelectedParcel(parcel)}
                  >
                    <PiListMagnifyingGlassDuotone />
                  </label>

                  <button
                    className="btn btn-square hover:bg-primary tooltip"
                    data-tip="Delete Parcel"
                    onClick={() => handleParcelDelete(parcel._id)}
                  >
                    <TbTrashXFilled />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===================== DETAILS MODAL ===================== */}
      <input type="checkbox" id="detailsModal" className="modal-toggle" />

      {selectedParcel && (
        <div className="modal">
          <div className="modal-box max-w-3xl">
            <h3 className="font-bold text-2xl mb-4">Parcel Details</h3>

            <div className="border p-4 rounded-lg bg-gray-50 space-y-6">
              {/* PARCEL INFO */}
              <div>
                <h4 className="font-semibold text-lg mb-2">Parcel Info</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <p>
                    <strong>Name:</strong> {selectedParcel.parcelName}
                  </p>
                  <p>
                    <strong>Type:</strong> {selectedParcel.parcelType}
                  </p>

                  <p>
                    <strong>Weight:</strong> {selectedParcel.parcelWeight} kg
                  </p>
                  <p>
                    <strong>Cost:</strong> ৳{selectedParcel.cost}
                  </p>

                  <p>
                    <strong>Payment Status:</strong>{" "}
                    {selectedParcel.paymentStatus}
                  </p>
                  <p>
                    <strong>Tracking ID:</strong> {selectedParcel.trackingId}
                  </p>

                  <p className="md:col-span-2">
                    <strong>Created At:</strong>{" "}
                    {new Date(selectedParcel.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <hr />

              {/* GRID 2 — SENDER & RECEIVER */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* SENDER */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">Sender Info</h4>
                  <div className="space-y-1">
                    <p>
                      <strong>Name:</strong> {selectedParcel.senderName}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedParcel.senderEmail}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedParcel.senderPhone}
                    </p>
                    <p>
                      <strong>Address:</strong> {selectedParcel.senderAddress}
                    </p>
                    <p>
                      <strong>Region:</strong> {selectedParcel.senderRegion}
                    </p>
                    <p>
                      <strong>District:</strong> {selectedParcel.senderDistrict}
                    </p>
                    <p>
                      <strong>Pickup Instruction:</strong>{" "}
                      {selectedParcel.pickupInstruction}
                    </p>
                  </div>
                </div>

                {/* RECEIVER */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">Receiver Info</h4>
                  <div className="space-y-1">
                    <p>
                      <strong>Name:</strong> {selectedParcel.receiverName}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedParcel.receiverEmail}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedParcel.receiverPhone}
                    </p>
                    <p>
                      <strong>Address:</strong> {selectedParcel.receiverAddress}
                    </p>
                    <p>
                      <strong>Region:</strong> {selectedParcel.receiverRegion}
                    </p>
                    <p>
                      <strong>District:</strong>{" "}
                      {selectedParcel.receiverDistrict}
                    </p>
                    <p>
                      <strong>Delivery Instruction:</strong>{" "}
                      {selectedParcel.deliveryInstruction}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-action">
              <label htmlFor="detailsModal" className="btn">
                Close
              </label>
            </div>
          </div>
        </div>
      )}
      {/* ========================================================== */}
    </div>
  );
};

export default MyParcels;
