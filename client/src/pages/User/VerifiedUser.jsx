import { Alert, AlertTitle, Box } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { validateVerification } from "../../actions/userAction";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/layout/Loader";

const VerifiedUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { token } = useParams();

  const { loading, success, error } = useSelector(
    (state) => state.validateUserEmail
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    dispatch(validateVerification(token));
    if (success) {
      alert.success("Email verified successfully");
      setTimeout(() => {
        navigate("/account");
        dispatch({ type: "VALIDATE_USER_RESET" });
      }, 5000);
    }
  }, [alert, dispatch, error, navigate, success, token]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Layout>
          <Box
            sx={{
              width: "100%",
              height: "50vh",
              m: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Your Email Verified Successfully —{" "}
              <strong>just wait till redirect you to your account page.</strong>
            </Alert>
          </Box>
        </Layout>
      )}
    </Fragment>
  );
};

export default VerifiedUser;
