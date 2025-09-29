import { RouteIndex, RouteSignIn } from "@/helpers/RouteName";
import Signin from "@/pages/Signin";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRouteAdmin() {
  const user = useSelector((state) => state.user);
  if (user && user.isLoggedIn && user.user.role === "admin") {
    return <Outlet />;
  } else {
    return (
      // <Navigate to={RouteSignIn} />
      <div className="fixed left-0 right-0 top-0 bottom-0 w-full backdrop-blur-xs bg-black/20 z-30">
        <div className="z-50">
          <Signin />
        </div>
        <Outlet />
      </div>
    );
  }
}
