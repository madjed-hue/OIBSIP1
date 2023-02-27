import React, { Fragment, useEffect, useState } from "react";
import "./UpdateProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import { Link, useNavigate } from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face";
import Loader from "../../components/layout/Loader";
import Layout from "../../components/layout/Layout";
import MetaData from "../../components/layout/MetaData";
import { loadUser, updateProfile } from "../../actions/userAction";
import { MdKeyboardBackspace } from "react-icons/md";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("_method", "PUT");
    myForm.append("Accept", "multipart/form-data");
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };
  const updateProfileDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
      setAvatarPreview(user?.avatar?.url);
    }
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }

    if (isUpdated) {
      alert.success("User Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: "UPDATE_PROFILE_RESET",
      });
    }
    <MetaData title="Update Profile" />;
  }, [dispatch, error, alert, navigate, isUpdated, user]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Layout>
          <Fragment>
            <div className="updateProfileContainer">
              <div className="updateProfileBox">
                <h2 className="updateProfileHeading">Update Profile</h2>
                <form
                  className="updateProfileForm"
                  encType="multipart/form-data"
                  onSubmit={updateProfileSubmit}
                >
                  <div className="UpdateProfileName">
                    <FaceIcon />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="UpdateProfileEmail">
                    <MailOutlinedIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div id="updateProfileImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={updateProfileDataChange}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Update"
                    className="updateProfileBtn"
                  />
                  <Link to="/account">
                    BACK <MdKeyboardBackspace />
                  </Link>
                </form>
              </div>
            </div>
          </Fragment>
        </Layout>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
