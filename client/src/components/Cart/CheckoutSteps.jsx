import {
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { Fragment } from "react";
import MopedIcon from "@mui/icons-material/Moped";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PaymentIcon from "@mui/icons-material/Payment";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const isMobile = useMediaQuery("(max-width:998px)");
  const steps = [
    {
      label: <Typography>Delivery Details</Typography>,
      icon: <MopedIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <DoneAllIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <PaymentIcon />,
    },
  ];
  const stepStyles = {
    boxSizing: "border-box",
    paddingTop: `${isMobile ? "10vmax" : "4vmax"}`,
  };
  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "#ffbf00" : "00000059",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
