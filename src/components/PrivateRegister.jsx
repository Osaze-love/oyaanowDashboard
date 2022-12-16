import React, { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutesDashboard = () => {
  const { user } = useSelector((state) => state.user);

  return user.staff?.roles?.superAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutesDashboard;
