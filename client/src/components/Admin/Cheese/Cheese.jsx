import React, { Fragment, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Header from "../Header/Header";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCheese, getAllCheese } from "../../../actions/cheeseAction";
import DashboardLoader from "../Loader/DashboardLoader";

const Cheese = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const data = [];

  const { loading, cheeses, error } = useSelector((state) => state.cheeses);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.singleCheese
  );

  cheeses?.length &&
    cheeses?.forEach((cheese) => {
      const sauceInfo = {
        id: cheese._id,
        name: cheese.name,
        stock: cheese.stock,
        price: `${cheese.price} $`,
        image: cheese.image.url,
      };
      data.push(sauceInfo);
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
      alert.success("Cheese Deleted Successfully");
      dispatch({ type: "DELETE_CHEESE_RESET" });
    }
    dispatch(getAllCheese());
  }, [dispatch, error, alert, isDeleted, deleteError]);

  const deleteSauceHandler = (id) => {
    dispatch(deleteCheese(id));
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
      field: "name",
      headerName: "Name",
      width: 150,
      cellClassName: "name-column--cell",
      headerAlign: "left",
    },
    {
      field: "stock",
      headerName: "Stock",
      headerAlign: "left",
      width: 100,
      cellClassName: "name-column--cell",
      align: "left",
    },
    {
      field: "image",
      headerName: "Image",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Avatar src={params.row.image} />
          </>
        );
      },
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
            <Link to={`/admin/dashboard/cheese/${params.row.id}`}>
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
            <Header title="CHEESE" subtitle="MANAGE CHEESE PANEL" />
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

export default Cheese;
