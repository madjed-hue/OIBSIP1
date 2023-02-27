import React, { Fragment, useEffect, useState } from "react";
import "./ForgotPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import Loader from "../../components/layout/Loader";
import { forgotPassword } from "../../actions/userAction";
import Layout from "../../components/layout/Layout";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Layout>
          {/* <MetaData title="Forgot Password" /> */}
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
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
                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
                <Link to="/login">
                  BACK <MdKeyboardBackspace />
                </Link>
              </form>
            </div>
          </div>
        </Layout>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
