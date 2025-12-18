import React, { useState } from "react";
import "./admin.scss";
import { Outlet } from "react-router-dom";
import Sidebar from "../../companents/sidebar/Sidebar";
import AdminHeader from "../../companents/admin-header/AdminHeader";

const Admin = () => {
  const [close, setClose] = useState(false);
  return (
    <div className={`admin ${close ? "admin__close" : ""}`}>
      <Sidebar />
      <div>
        <AdminHeader setClose={setClose} />
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;