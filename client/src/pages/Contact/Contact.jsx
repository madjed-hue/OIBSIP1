import React, { useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Layout from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { createMessage } from "../../actions/messageAction";

const Contact = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { loading, error, success } = useSelector((state) => state.newMessage);

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };
  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Invalid email!").required("Required"),
    phone: yup
      .string()
      .matches(phoneRegExp, "phone number is not valid!")
      .required("Required"),
    message: yup.string().required("Required"),
  });

  const handleFormSubmit = (values, { resetForm }) => {
    // e.preventDefault();

    const myForm = new FormData();

    myForm.set("firstName", values.firstName);
    myForm.set("lastName", values.lastName);
    myForm.set("email", values.email);
    myForm.set("phone", values.phone);
    myForm.set("text", values.message);

    dispatch(createMessage(myForm));
    resetForm({ values: "" });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (success) {
      alert.success("Message sent successfully");
      dispatch({ type: "NEW_MESSAGE_RESET" });
    }
  }, [alert, dispatch, error, success]);

  return (
    <Layout>
      <Box m="4vmax auto" sx={{ width: "50vmax" }}>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            mb: "4vmax",
            pb: "1vmax",
            borderBottom: "1px solid #ccc",
          }}
        >
          Contact
        </Typography>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Phone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  name="phone"
                  error={!!touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Message"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.message}
                  name="message"
                  error={!!touched.message && !!errors.message}
                  helperText={touched.message && errors.message}
                  sx={{ gridColumn: "span 4" }}
                  multiline
                  rows={5}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  disabled={loading ? true : false}
                >
                  Send
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Layout>
  );
};

export default Contact;
