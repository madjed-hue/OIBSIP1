import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/layout/Loader";
import MetaData from "../../components/layout/MetaData";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Layout>
          <MetaData title={`${user && user.name}'s Profile`} />;
          <Fragment>
            <div className="profileContainer">
              <div>
                <h1>My Profile</h1>
                <img src={user && user?.avatar?.url} alt={user && user.name} />
                <Link to="/me/update">Edit Profile</Link>
              </div>
              <div>
                <div>
                  <div>
                    <h4>Full Name</h4>
                    <p>{user && user?.name}</p>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>{user && user?.email}</p>
                  </div>
                  <div>
                    <h4>Joined On</h4>
                    <p>{user && user?.createdAt?.split("T")[0]}</p>
                  </div>
                </div>

                <div>
                  <Link to="/orders">My Orders</Link>
                  <Link to="/password/update">Change Password</Link>
                </div>
              </div>
            </div>
          </Fragment>
        </Layout>
      )}
    </Fragment>
  );
};

export default Profile;
