import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: roleData, isLoading: isRoleLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role?email=${user.email}`);
      return res.data?.role;
    },
  });

  return {
    role: roleData,
    isAdmin: roleData === "admin",
    isRider: roleData === "rider",
    isCustomer: roleData === "user",
    isLoading: loading || isRoleLoading,
    user,
  };
};

export default useRole;
