import React, { Fragment, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteOrder, getAllOrders } from "../../../actions/orderAction";
import clsx from "clsx";
import DashboardLoader from "../Loader/DashboardLoader";

const OrdersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const data = [];

  const { loading, error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, success } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch({ type: "CLEAR_ERRORS" });
    }

    if (success) {
      alert.success("Order Deleted Successfully");
      navigate("/admin/dashboard/orders");
      dispatch({ type: "DELETE_ORDER_RESET" });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, success, navigate]);

  orders?.length &&
    orders?.forEach((order) => {
      const userInfo = {
        id: order._id,
        status: order.orderStatus,
        itemsQty: order.orderItems.length,
        amount: order.totalPrice,
        coupons: order.couponPrice,
        user: order.user.name,
      };
      data.push(userInfo);
    });

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      width: 250,
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "user",
      headerName: "User",
      width: 200,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerAlign: "left",
      cellClassName: (params) => {
        return clsx(".MuiDataGrid-cellContent", {
          greenColor: params.value === "Delivered",
          redColor: params.value === "Processing",
        });
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      cellClassName: "name-column--cell",
      headerAlign: "center",
      width: 130,
      align: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 120,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "coupons",
      headerName: "Coupons",
      headerAlign: "center",
      cellClassName: "name-column--cell",
      width: 120,
      align: "center",
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
            <Link to={`/admin/dashboard/orders/${params.row.id}`}>
              <EditIcon sx={{ color: "rgb(0 147 133)", marginRight: "10px" }} />
            </Link>

            <Button
              onClick={() => deleteOrderHandler(params.row.id)}
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
            <Header title="ORDERS" subtitle="Manage All Orders" />
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

export default OrdersList;
