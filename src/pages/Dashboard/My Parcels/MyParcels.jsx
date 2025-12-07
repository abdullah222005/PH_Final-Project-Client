import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEdit } from "react-icons/fa";
import { PiListMagnifyingGlassDuotone } from "react-icons/pi";
import { TbTrashXFilled } from "react-icons/tb";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyParcels = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    })

    const handleParcelDelete = (id)=>{
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
            axiosSecure.delete(`/parcels/${id}`)
            .then(res=>{
                if(res.data.deletedCount){
                    refetch();
                    Swal.fire({
                      title: "Deleted!",
                      text: "Your file has been deleted.",
                      icon: "success",
                    });
                }
            })
          }
        });

    }

    return (
      <div>
        <h1 className="text-2xl md:text-4xl font-semibold my-8">
          All of my parcels: {parcels.length}
        </h1>
        <div className="overflow-x-auto rounded-box border border-base-content/5 p-4 bg-gray-300">
          <table className="table table-pin-rows table-pin-cols text-center shadow-2xl bg-white">
            {/* head */}
            <thead className="text-lg">
              <tr>
                <th></th>
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
              {/* row 1 */}

              {parcels.map((parcel, index) => (
                <tr className="hover:bg-base-300" key={parcel._id}>
                  <th>{index + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.parcelType}</td>
                  <td>{parcel.parcelWeight} kg</td>
                  <td>{parcel.cost} tk</td>
                  <td>
                    {
                        parcel.paymentStatus === 'paid' ?
                         <button disabled={true} className='btn btn-square'>Paid</button> :
                         <Link to={`/dashboard/payment/${parcel._id}`}>
                            <button className='btn btn-square bg-red-300'>Pay</button>
                         </Link>
                    }
                  </td>
                  <td>---</td>
                  <td>
                    <button
                      className="btn btn-square hover:bg-primary tooltip"
                      data-tip="Edit Parcel"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-square hover:bg-primary mx-3 tooltip"
                      data-tip="View Parcel Details"
                    >
                      <PiListMagnifyingGlassDuotone />
                    </button>
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
      </div>
    );
};

export default MyParcels;