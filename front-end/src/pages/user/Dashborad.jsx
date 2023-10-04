import React from "react";
import UserMenu from "../../Components/UserMenu/UserMenu";
import { useAuth } from "../../context/auth";

const Dashborad = () => {
  const [auth] = useAuth();
  return (
    <div className="container-fluid p-3 m-3">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <h3>
              User Name :{" "}
              <span className="text-secondary">{auth?.user?.name}</span>
            </h3>
            <h3>
              User Email:{" "}
              <span className="text-secondary">{auth?.user?.email}</span>
            </h3>
            <h3>
              User Contact:{" "}
              <span className="text-secondary">{auth?.user?.phone}</span>
            </h3>
            <h3>
              User Address:{" "}
              <span className="text-secondary">{auth?.user?.address}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashborad;
