import React, { Fragment, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../../../actions/userAction";
import { useAlert } from "react-alert";
import Header from "../Header/Header";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DashboardLoader from "../Loader/DashboardLoader";

const Users = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const data = [];

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  users?.length &&
    users?.forEach((user) => {
      const userInfo = {
        id: user._id,
        name: user.name,
        email: user.email,
        access: user.role,
        avatar: user.avatar.url,
      };
      data.push(userInfo);
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatchEvent({ type: "CLEAR_ERRORS" });
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatchEvent({ type: "CLEAR_ERRORS" });
    }
    if (isDeleted) {
      alert.success(message);
      dispatch({ type: "DELETE_USER_RESET" });
    }
    dispatch(getAllUsers());
  }, [alert, deleteError, dispatch, error, isDeleted, message]);

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 250,
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      cellClassName: "name-column--cell",
      headerAlign: "left",
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "left",
      cellClassName: "name-column--cell",
      width: 180,
      align: "left",
    },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 120,
      renderCell: (params) => {
        // console.log(params);
        return (
          <>
            <Avatar src={params.row.avatar}>
              {params.row.name.split("")[0]}
            </Avatar>
          </>
        );
      },
    },
    {
      field: "role",
      headerName: "Access Level",
      headerAlign: "left",
      width: 150,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={access === "admin" ? "#3da58a" : "#1e5245"}
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color="#fff" sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      align: "right",
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/dashboard/users/${params.row.id}`}>
              <EditIcon sx={{ color: "rgb(0 147 133)", marginRight: "10px" }} />
            </Link>

            <Button
              onClick={() => deleteUserHandler(params.row.id)}
              sx={{ bgcolor: "transparent !important" }}
            >
              <DeleteIcon sx={{ color: "rgb(255 0 0)" }} />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  return (
    <Fragment>
      {loading ? (
        <DashboardLoader />
      ) : (
        <Box m="20px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title="USERS" subtitle="MANAGE USERS PANEL" />
          </Box>
          <Box
            m="8px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: "#333",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#ffbf00",
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#f2f0f0",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: "#ff8400",
              },
              "& .MuiCheckbox-root": {
                color: "#1e5245 !important",
              },
            }}
          >
            <DataGrid rows={data} columns={columns} />
          </Box>
        </Box>
      )}
    </Fragment>
  );
};

export default Users;
