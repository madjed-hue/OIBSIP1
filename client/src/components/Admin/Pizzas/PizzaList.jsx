import React, { Fragment, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Header from "../Header/Header";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePizza, getAdminPizza } from "../../../actions/pizzaAction";
import DashboardLoader from "../Loader/DashboardLoader";

const PizzaList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const data = [];

  const { loading, pizzas, error } = useSelector((state) => state.pizzas);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.singlePizza
  );

  pizzas?.length &&
    pizzas?.forEach((pizza) => {
      const userInfo = {
        id: pizza._id,
        name: pizza.name,
        stock: pizza.stock,
        price: pizza.prices,
        image: pizza.image.url,
      };
      data.push(userInfo);
    });

  //   console.log(pizzas);

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
      alert.success("Pizza Deleted Successfully");
      navigate("/admin/dashboard/pizzas");
      dispatch({ type: "DELETE_PIZZA_RESET" });
    }
    dispatch(getAdminPizza());
  }, [alert, deleteError, dispatch, error, isDeleted, navigate]);

  const deletePizzaHandler = (id) => {
    dispatch(deletePizza(id));
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
      cellClassName: "name-column--cell",
      headerAlign: "left",
      width: 100,
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
      field: "prices",
      headerName: "Prices",
      headerAlign: "left",
      cellClassName: "name-column--cell",
      width: 120,
      align: "left",
      renderCell: (params) => {
        return (
          <>
            {params.row.price.map((p) => (
              <Typography variant="body2" sx={{ mx: "3px" }} key={p}>
                {p}
              </Typography>
            ))}
          </>
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
            <Link to={`/admin/dashboard/pizzas/${params.row.id}`}>
              <EditIcon sx={{ color: "rgb(0 147 133)", marginRight: "10px" }} />
            </Link>

            <Button
              onClick={() => deletePizzaHandler(params.row.id)}
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
            <Header title="PIZZA" subtitle="MANAGE PIZZA PANEL" />
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

export default PizzaList;
