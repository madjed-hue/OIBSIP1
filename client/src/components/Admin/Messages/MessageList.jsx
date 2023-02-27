import React, { Fragment, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Header from "../Header/Header";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DashboardLoader from "../Loader/DashboardLoader";
import { deleteMessage, getAllMessages } from "../../../actions/messageAction";

const MessageList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [open, setOpen] = useState(false);
  const [messageDetails, setMessageDetails] = useState({});

  const handleClickOpen = (id, fullName, email, phone, text) => {
    const msg = {
      id,
      fullName,
      email,
      phone,
      text,
    };
    setMessageDetails(msg);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMessageDetails({});
  };

  const data = [];

  const { loading, messages, error } = useSelector((state) => state.messages);

  const {
    error: deleteError,
    isDeleted,
    message: sgMessage,
  } = useSelector((state) => state.singleMessage);

  messages?.length &&
    messages?.forEach((message) => {
      const messageInfo = {
        id: message._id,
        fullName: `${message.firstName} ${message.lastName}`,
        email: message.email,
        phone: message.phone,
        text: message.text,
      };
      data.push(messageInfo);
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (isDeleted) {
      alert.success("Message Deleted successfully");
      dispatch({ type: "DELETE_MESSAGE_RESET" });
    }
    dispatch(getAllMessages());
  }, [dispatch, error, alert, isDeleted, sgMessage, deleteError]);

  const deleteMessageHandler = (id) => {
    dispatch(deleteMessage(id));
  };

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 200,

      cellClassName: "name-column--cell",
    },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 120,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
    },

    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      cellClassName: "name-column--cell",
      width: 120,
      align: "center",
    },
    {
      field: "phone",
      headerName: "Phone",
      headerAlign: "center",
      cellClassName: "name-column--cell",
      width: 120,
      align: "center",
    },
    {
      field: "text",
      headerName: "Message",
      headerAlign: "center",
      cellClassName: "name-column--cell",
      width: 150,
      flex: 1,
      align: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              sx={{
                color: "rgb(0 147 133)",
                marginRight: "10px",
                background: "#fff !important",
              }}
              onClick={() =>
                handleClickOpen(
                  params.row.id,
                  params.row.fullName,
                  params.row.email,
                  params.row.phone,
                  params.row.text
                )
              }
            >
              <VisibilityOutlinedIcon />
            </Button>

            <Button
              onClick={() => deleteMessageHandler(params.row.id)}
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
            <Header title="MESSAGES" subtitle="MANAGE MESSAGES PANEL" />
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
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            sx={{ letterSpacing: "1px" }}
          >
            <DialogTitle
              id="alert-dialog-title"
              sx={{ font: "500 1.2vmax 'Oswald'" }}
            >
              Message from : {messageDetails?.fullName}
            </DialogTitle>

            <DialogContent>
              <Typography variant="h5" m={2}>
                Email : {messageDetails?.email}
              </Typography>
              <Typography variant="h5" m={2}>
                Phone : {messageDetails?.phone}
              </Typography>
              <DialogContentText id="alert-dialog-description" m={2}>
                Message : {messageDetails?.text}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} sx={{ color: "#fff" }}>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Fragment>
  );
};

export default MessageList;
