import React from "react";
import AdminMenu from "../../Components/AdminMenu/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <h3>
              Admin Name :{" "}
              <span className="text-secondary">{auth?.user?.name}</span>
            </h3>
            <h3>
              Admin Email:{" "}
              <span className="text-secondary">{auth?.user?.email}</span>
            </h3>
            <h3>
              Admin Contact:{" "}
              <span className="text-secondary">{auth?.user?.phone}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
