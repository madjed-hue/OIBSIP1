import { Grid, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { CutPizza, Delivery, PizzaOrder, Seat } from "../../assets";

const Services = () => {
  return (
    <div className="fifth-div">
      <Box width="80%" m="auto">
        <Stack gap={2} sx={{ textAlign: "center", width: "70%" }} m="auto">
          <Typography variant="subtitle1" color="#d2401e">
            WHAT YOU GET WITH US
          </Typography>
          <Typography variant="h4" fontWeight={500}>
            WE’VE GOT YOU COVERED!
          </Typography>
          <Typography
            variant="body1"
            fontSize={20}
            color="#888"
            fontFamily="Open sans"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit
            arcu in pretium molestie. Interdum et malesuada fames ac.
          </Typography>
        </Stack>
        <Grid container spacing={1} margin="2vmax auto">
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={1} textAlign="center">
              <img
                src={Delivery}
                alt="delivery image"
                width={100}
                height={77}
                style={{ margin: "auto", opacity: 0.7 }}
              />
              <Typography color="#b7903c" variant="h6">
                FAST DELIVERY
              </Typography>
              <Typography variant="body2" fontFamily="Open sans">
                We Provide a fast and ponctual delivery services.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={1} textAlign="center">
              <img
                src={PizzaOrder}
                alt="order image"
                width={100}
                height={77}
                style={{ margin: "auto", opacity: 0.7 }}
              />
              <Typography color="#b7903c" variant="h6">
                PICKUP IN STORE
              </Typography>
              <Typography variant="body2" fontFamily="Open sans">
                You can pick up in store as well as seating here.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={1} textAlign="center">
              <img
                src={Seat}
                alt="Reservations image"
                width={100}
                height={77}
                style={{ margin: "auto", opacity: 0.7 }}
              />
              <Typography color="#b7903c" variant="h6">
                SEAT RESERVATION
              </Typography>
              <Typography variant="body2" fontFamily="Open sans">
                Reservations are available all the days from 8 AM till 8 PM.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={1} textAlign="center" margin="auto">
              <img
                src={CutPizza}
                alt="cutering image"
                width={100}
                height={77}
                style={{ margin: "auto", opacity: 0.7 }}
              />
              <Typography color="#b7903c" variant="h6">
                PRO CATERING SERVICES
              </Typography>
              <Typography variant="body2" fontFamily="Open sans">
                Professional cutering services with smart sliced boxes..
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Services;
