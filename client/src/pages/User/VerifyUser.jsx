import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
import { resendVerification } from "../../actions/userAction";
import Loader from "../../components/layout/Loader";

const VerifyUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, success, message, loading } = useSelector(
    (state) => state.verify
  );

  const [email, setEmail] = useState("");

  const verifySubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(resendVerification(myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (success) {
      alert.success(message);
    }
  }, [alert, dispatch, error, message, success]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Layout>
          <div className="forgotPasswordContainer">
            <div className="resendVerifyLinkBox">
              <h2 className="forgotPasswordHeading">
                Resend Verification Link
              </h2>

              <form
                className="forgotPasswordForm"
                onSubmit={verifySubmitHandler}
              >
                <p style={{ marginBottom: "15px", color: "#888" }}>
                  your email is not verified yet !
                </p>
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

export default VerifyUser;
