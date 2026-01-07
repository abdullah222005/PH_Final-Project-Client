import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";

const UsersManage = () => {
  const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");
  const { data: usersData = [], refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const filteredUsers = usersData.filter(
    (user) =>
      user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto my-11">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-4xl font-semibold">
          All users List: {usersData.length}
        </h1>
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input onChange={(e)=>setSearchTerm(e.target.value)} type="search" required placeholder="Search user via Name or Email" />
        </label>
      </div>
      <div className="overflow-x-auto bg-secondary p-5 rounded-2xl my-7">
        <table className="table bg-white text-center">
          {/* head */}
          <thead className="text-lg">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Role</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          {/* row 1 */}
          {filteredUsers.map((user, index) => {
            return (
              <tbody key={index} className="text-[16px]">
                <tr>
                  <td>
                    <div className="flex items-center gap-5">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.displayName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.createdAt.split("T")[0]}</td>
                  <td className="font-semibold">{user.role.toUpperCase()}</td>
                  <td className="">
                    <button className="btn btn-square">
                      <FaUserShield />
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default UsersManage;
