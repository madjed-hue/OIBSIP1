import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { Free, Piece, PizzaBox, PizzaBoxMockup, Slice } from "../../assets";

const Specials = ({ isMobile, isMobileXs }) => {
  return (
    <div className="third-div">
      <Box sx={{ textAlign: "center" }} mb={isMobile ? 2 : 10}>
        <Link to="/">ORDER ONLINE</Link>
        <Typography mt={4}>
          * Offers only available for carry out and delivery orders.
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }} className="gift-img">
        <img src={Free} alt="gifts" width="100%" />
      </Box>
      <Box
        mt={isMobile ? 2 : 6}
        sx={{
          display: "flex",
          flexDirection: `${isMobile ? "column" : "row"}`,
          justifyContent: `${isMobile ? "center" : "space-between"}`,
        }}
      >
        <Box sx={{ flex: "1" }}>
          <Typography variant="caption" sx={{ color: "#d2401e" }}>
            COME AND GET
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "500" }} mt={2} mb={2}>
            SMART PIZZA SLICE BOX
          </Typography>
          <Typography variant="subtitle1" sx={{ fontSize: "18px" }}>
            A nice smart sliced pizza box for easy sharing with your friends or
            family.
          </Typography>
          <Box
            mt={4}
            sx={{
              display: "grid",
              gridTemplateColumns: `${
                isMobileXs ? "repeat(2, 1fr)" : "repeat(3, 1fr)"
              }`,
              gridTemplateRows: "1fr 0fr 0fr",
              gap: "0 20px",
              width: "100%",
            }}
          >
            <Box>
              <Stack spacing={2}>
                <Typography sx={{ color: "#b7903c" }}>ORDER PIZZA</Typography>
                <Box m={0}>
                  <img src={PizzaBox} alt="Pizza Box" />
                </Box>
                <Typography sx={{ color: "#d2401e" }}>18 inches</Typography>
              </Stack>
            </Box>
            <Box>
              <Stack spacing={2}>
                <Typography sx={{ color: "#b7903c" }}>SEPARATE BOX</Typography>
                <Box m={0}>
                  <img src={Slice} alt="Slice Pizza Box" />
                </Box>
              </Stack>
            </Box>
            <Box>
              <Stack spacing={2}>
                <Typography sx={{ color: "#b7903c" }}>
                  USE AS COASTER
                </Typography>
                <Box m={0}>
                  <img src={Piece} alt="Slice Pizza Box" />
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
        <Box sx={{ flex: "1", width: "100%", height: "100%" }}>
          <img
            src={PizzaBoxMockup}
            alt="pizza box"
            style={{ width: `${isMobile ? "100%" : "120%"}` }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Specials;
