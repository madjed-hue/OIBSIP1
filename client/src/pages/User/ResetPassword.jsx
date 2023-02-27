import React, { Fragment, useEffect, useState } from "react";
import "./ResetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import Loader from "../../components/layout/Loader";
import { resetPassword } from "../../actions/userAction";
import Layout from "../../components/layout/Layout";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { token } = useParams();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isShow2, setIsShow2] = useState(false);

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }

    if (success) {
      alert.success("Password Updated Successfully");
      navigate("/login");
    }
  }, [dispatch, error, alert, navigate, success]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Layout>
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Reset Password</h2>
              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockIcon />
                  <input
                    type={isShow ? "text" : "password"}
                    placeholder="New password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {isShow ? (
                    <AiFillEye
                      size={24}
                      className="eye"
                      onClick={() => setIsShow(!isShow)}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      size={24}
                      className="eye"
                      onClick={() => setIsShow(!isShow)}
                    />
                  )}
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type={isShow2 ? "text" : "password"}
                    placeholder="Confirm password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {isShow2 ? (
                    <AiFillEye
                      size={24}
                      className="eye"
                      onClick={() => setIsShow2(!isShow2)}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      size={24}
                      className="eye"
                      onClick={() => setIsShow2(!isShow2)}
                    />
                  )}
                </div>
                <input
                  type="submit"
                  value="Reset"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Layout>
      )}
    </Fragment>
  );
};

export default ResetPassword;
