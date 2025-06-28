import { LucideLoader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

import useAuth from "@/context/use-auth";

const IsNotAuthenticated = () => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="container flex flex-col items-center justify-center p-20">
        <div className="">
          <LucideLoader2 className=" animate-spin " size={32} />
        </div>
      </div>
    );
  }
  if (isLoggedIn) {
    return <Navigate to="/main" />;
  }

  return <Outlet />;
};

export default IsNotAuthenticated;
