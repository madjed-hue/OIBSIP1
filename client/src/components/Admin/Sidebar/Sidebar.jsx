import { useState } from "react";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Box, Typography, IconButton } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReviewsIcon from "@mui/icons-material/Reviews";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LocalPizzaOutlinedIcon from "@mui/icons-material/LocalPizzaOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import FilterFramesOutlinedIcon from "@mui/icons-material/FilterFramesOutlined";
import { TbCheese } from "react-icons/tb";
import { CiPizza } from "react-icons/ci";
import { GiSaucepan } from "react-icons/gi";
import { RiCoupon2Line } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegNewspaper } from "react-icons/fa";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { useSelector } from "react-redux";
import { useSidebarContext } from "./SidebarContext";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{ color: "#040509" }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MyProSidebar = () => {
  const [selected, setSelected] = useState("Dashboard");
  const { sidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  const { user } = useSelector((state) => state.user);
  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          // padding: "5px 35px 5px 20px !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .ps-menuitem-root:hover": {
          color: "#6870fa !important",
          backgroundColor: "transparent !important",
        },
        "& .ps-active": {
          color: `tomato !important`,
          backgroundColor: "transparent",
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor="#f2f0f0"
        image={sidebarImage}
      >
        <Menu iconshape="square">
          <MenuItem
            icon={
              collapsed && (
                <MenuOutlinedIcon
                  onClick={() => collapseSidebar()}
                  style={{ color: "#000" }}
                />
              )
            }
            sx={{
              margin: "10px 0 20px 0",
              color: "#000",
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={"#040509"}>
                  ADMINS
                </Typography>
                <IconButton
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!collapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  "& .avater-image": {
                    backgroundColor: "#141b2d",
                  },
                }}
              >
                <img
                  className="avater-image"
                  alt="profile user"
                  width="100px"
                  height="100px"
                  src={user?.avatar?.url}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={"#040509"}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.name}
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={collapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color="#3d3d3d"
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Manage Users"
              to="/admin/dashboard/users"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Pizzas"
              to="/admin/dashboard/pizzas"
              icon={<LocalPizzaOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Manage Sauces"
              to="/admin/dashboard/sauces"
              icon={<BiCategoryAlt size={22} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Cheeses"
              to="/admin/dashboard/cheeses"
              icon={<BiCategoryAlt size={22} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Coupons"
              to="/admin/dashboard/coupons"
              icon={<FaRegNewspaper size={22} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Reviews"
              to="/admin/dashboard/reviews"
              icon={<ReviewsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Orders"
              to="/admin/dashboard/orders"
              icon={<FilterFramesOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Messages"
              to="/admin/dashboard/messages"
              icon={<MessageOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color="#3d3d3d"
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Pages
            </Typography>

            <Item
              title="Add Pizza"
              to="/admin/dashboard/pizza/new"
              icon={<CiPizza size={22} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Cheese"
              to="/admin/dashboard/cheese/new"
              icon={<TbCheese size={22} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Sauce"
              to="/admin/dashboard/sauce/new"
              icon={<GiSaucepan size={22} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Coupons"
              to="/admin/dashboard/coupons/new"
              icon={<RiCoupon2Line size={22} />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color="#3d3d3d"
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/admin/dashboard/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/admin/dashboard/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/admin/dashboard/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color="#3d3d3d"
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Others
            </Typography>
            <Item
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
