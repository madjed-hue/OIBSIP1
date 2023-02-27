import React, { Fragment, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCoupons, getAllCoupons } from "../../../actions/couponsAction";
import DashboardLoader from "../Loader/DashboardLoader";

const CouponsList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const data = [];

  const { loading, coupons, error } = useSelector((state) => state.coupons);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.singleCoupons
  );

  coupons?.length &&
    coupons?.forEach((coupon) => {
      const couponInfo = {
        id: coupon._id,
        coupon: coupon.coupon,
        price: `${coupon.price} $`,
      };
      data.push(couponInfo);
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
      alert.success("Coupons Deleted Successfully");
      dispatch({ type: "DELETE_COUPONS_RESET" });
    }
    dispatch(getAllCoupons());
  }, [alert, deleteError, dispatch, error, isDeleted]);

  const deleteSauceHandler = (id) => {
    dispatch(deleteCoupons(id));
  };

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 250,
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "coupon",
      headerName: "Coupons",
      width: 150,
      cellClassName: "name-column--cell",
      headerAlign: "left",
    },

    {
      field: "price",
      headerName: "Price",
      headerAlign: "left",
      cellClassName: "name-column--cell",
      width: 120,
      align: "left",
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
            <Link to={`/admin/dashboard/coupons/${params.row.id}`}>
              <EditIcon sx={{ color: "rgb(0 147 133)", marginRight: "10px" }} />
            </Link>

            <Button
              onClick={() => deleteSauceHandler(params.row.id)}
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
            <Header title="COUPONS" subtitle="MANAGE COUPONS PANEL" />
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

export default CouponsList;
