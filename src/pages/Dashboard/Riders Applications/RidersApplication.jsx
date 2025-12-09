import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BsPersonFillCheck } from "react-icons/bs";
import { HiUserRemove } from "react-icons/hi";
import Swal from "sweetalert2";

const RidersApplication = () => {
  const axiosSecure = useAxiosSecure();

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const handleRiderAccept = (app) => {
    const updateInfo = { applicationStatus: "Approved" };
    axiosSecure.patch(`/riders/${app._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Application Accepted",
          showConfirmButton: false,
          timer: 2222,
        });
      }
    });
  };

  const handleRiderReject = (app) => {
    const updateInfo = { applicationStatus: "Rejected" };
    axiosSecure.patch(`/riders/${app._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Application Rejected",
          showConfirmButton: false,
          timer: 2222,
        });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto my-11">
      <h1 className="text-2xl md:text-4xl font-semibold">
        Total Riders & their Applications: {applications.length}
      </h1>

      <div className="overflow-x-auto rounded-box border border-base-content/5 p-4 bg-secondary mt-11">
        <table className="table table-pin-rows table-pin-cols text-center shadow-2xl bg-white">
          <thead className="text-lg">
            <tr>
              <th>SL</th>
              <th>Rider's Name, phone & Email</th>
              <th>Rider's NID & License</th>
              <th>Rider's Bike Model & reg. </th>
              <th>Address</th>
              <th>Application Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="text-[16px]">
            {applications.map((app, index) => (
              <tr className="hover:bg-base-300" key={app._id}>
                <th>{index + 1}</th>
                <td>
                  <h1>{app.name}</h1>
                  <h3>{app.phone}</h3>
                  <h5>{app.email}</h5>
                </td>
                <td>
                  <h1>{app.nid}</h1>
                  <h3>{app.license}</h3>
                </td>
                <td>
                  <h1>{app.bikeModel}</h1>
                  <h3>{app.bikeRegistration}</h3>
                </td>
                <td>
                  {app.district}, {app.region}
                </td>

                <td
                  className={`${
                    app.applicationStatus === "Approved"
                      ? "text-green-500" 
                      : app.applicationStatus === 'Rejected' 
                      ? "text-red-500"
                      : "text-black"
                  }  font-semibold`}
                >
                  {app.applicationStatus}
                </td>

                <td>
                  <button
                    className="btn btn-square hover:bg-primary tooltip mr-5"
                    data-tip="Accept Rider"
                    onClick={() => handleRiderAccept(app)}
                  >
                    <BsPersonFillCheck className="text-lg" />
                  </button>

                  {/* VIEW DETAILS BUTTON */}

                  <button
                    className="btn btn-square hover:bg-primary tooltip"
                    data-tip="Reject Rider"
                    onClick={() => handleRiderReject(app)}
                  >
                    <HiUserRemove className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RidersApplication;
