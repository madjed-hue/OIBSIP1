import React from "react";
import { Badge, Box, IconButton, InputBase } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useProSidebar } from "react-pro-sidebar";
import Notifications from "./Notifications";

const Topbar = ({ handleClick, data }) => {
  const { toggleSidebar, broken } = useProSidebar();

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex">
        {broken && (
          <IconButton
            sx={{ margin: "0 6 0 2" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
        <Box display="flex" backgroundColor="#f2f0f0" p={0.2} borderRadius={1}>
          <InputBase
            sx={{ ml: 1, flex: 1, color: "#000" }}
            placeholder="Search"
          />
          <IconButton type="button">
            <SearchIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", flex: "0.2", justifyContent: "space-between" }}
      >
        <IconButton onClick={handleClick} sx={{ position: "relative" }}>
          <Badge
            badgeContent={data?.length ? data.length : null}
            color="primary"
          >
            <NotificationsOutlinedIcon sx={{ color: "#fff" }} />
          </Badge>
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon sx={{ color: "#fff" }} />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Box>
      <Notifications />
    </Box>
  );
};

export default Topbar;
