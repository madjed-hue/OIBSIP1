import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./PizzaReviews.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { deleteReviews, getAllReviews } from "../../../actions/pizzaAction";
import { Box } from "@mui/material";
import Header from "../Header/Header";
import DashboardLoader from "../Loader/DashboardLoader";

const ReviewsList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const navigate = useNavigate();

  const { error: deleteError, success } = useSelector((state) => state.review);

  const { error, reviews, loading } = useSelector(
    (state) => state.pizzaReviews
  );

  const [pizzaId, setPizzaId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, pizzaId));
  };
  const pizzaReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(pizzaId));
  };

  useEffect(() => {
    if (pizzaId.length === 24) {
      dispatch(getAllReviews(pizzaId));
    }
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch({ type: "CLEAR_ERRORS" });
    }

    if (success) {
      alert.success("Review Deleted Successfully");
      navigate("/admin/dashboard/reviews");
      dispatch({ type: "DELETE_REVIEW_RESET" });
    }
  }, [dispatch, alert, error, deleteError, success, pizzaId, navigate]);

  const columns = [
    {
      field: "id",
      headerName: "Review ID",
      minWidth: 200,
      cellClassName: "name-column--cell",
    },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      cellClassName: "name-column--cell",
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,

      cellClassName: (params) => {
        return params.row.rating >= 3 ? "greenColor" : "redColor";
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button onClick={() => deleteReviewHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });
  return (
    <Fragment>
      {loading ? (
        <DashboardLoader />
      ) : (
        <div className="dashboard">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            m={2}
          >
            <Header title="REVIEWS" subtitle="Manage All Reviews" />
          </Box>
          <div className="pizzaReviewsContainer">
            <form
              className="pizzaReviewsForm"
              onSubmit={pizzaReviewsSubmitHandler}
            >
              <h1 className="pizzaReviewsFormHeading">ALL REVIEWS</h1>

              <div>
                <StarIcon />
                <input
                  type="text"
                  placeholder="Pizza Id"
                  required
                  value={pizzaId}
                  onChange={(e) => setPizzaId(e.target.value)}
                />
              </div>

              <Button
                id="createReviewBtn"
                type="submit"
                disabled={
                  loading ? true : false || pizzaId === "" ? true : false
                }
              >
                Search
              </Button>
            </form>

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
              {reviews && reviews.length > 0 ? (
                <DataGrid rows={rows} columns={columns} />
              ) : (
                <h1 className="pizzaReviewsFormHeading">No Reviews Found</h1>
              )}
            </Box>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ReviewsList;
