import { Box, Popper, Typography } from "@mui/material";
import React, { useContext } from "react";
import { notificationContext } from "../../../pages/admin/Dashboard";

const Notifications = () => {
  const value = useContext(notificationContext);
  const { id, open, anchorEl, data } = value;
  return (
    <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      placement="bottom-end"
      sx={{ width: "280px" }}
    >
      <Box
        sx={{
          border: "1px solid tomato",
          p: 2,
          bgcolor: "#f2f0f0",
          height: "50vh",
          overflowY: "scroll",
        }}
      >
        {data.length > 0 ? (
          data?.map((item) => (
            <Typography variant="subtitle1" key={item.id} mb={1}>
              {item.name} stock is almost out. remained{" "}
              <strong> ({item.stock}) </strong>
            </Typography>
          ))
        ) : (
          <Typography variant="subtitle1">No notifications !</Typography>
        )}
      </Box>
    </Popper>
  );
};

export default Notifications;
