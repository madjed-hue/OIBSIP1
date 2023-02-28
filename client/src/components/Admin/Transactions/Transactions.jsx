import { Box, Typography } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../actions/orderAction";
import DashboardLoader from "../Loader/DashboardLoader";

const Transactions = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const data = [];

  orders?.length &&
    orders?.forEach((order) => {
      const orderInfo = {
        txId: order?.paymentInfo.id,
        user: order?.user?.name,
        date: order?.paisAt.split("T")[0],
        cost: order?.totalPrice,
      };
      data.push(orderInfo);
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    dispatch(getAllOrders());
  }, [alert, error, dispatch]);
  return (
    <Fragment>
      {loading ? (
        <DashboardLoader />
      ) : (
        <Box
          backgroundColor="#f2f0f0"
          maxHeight="100vh"
          overflow="auto"
          m="25px 0 0 0"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${"#141b2d"}`}
            color="#141414"
            p="15px"
          >
            <Typography variant="h5" fontWeight="600" color="#141414">
              Resent Transaction
            </Typography>
          </Box>
          {data?.length &&
            data.map((transaction, i) => {
              return (
                <Box
                  key={`${transaction}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${"#141b2d"}`}
                  p="15px"
                >
                  <Box>
                    <Typography variant="h6" fontWeight="500" color="#0f2922">
                      {transaction?.txId}
                    </Typography>
                    <Typography color="#141414">{transaction.user}</Typography>
                  </Box>
                  <Box color="#141414">{transaction?.date}</Box>
                  <Box color="#4cceac" p="5px 10px" borderRadius="4px">
                    ${transaction?.cost}
                  </Box>
                </Box>
              );
            })}
        </Box>
      )}
    </Fragment>
  );
};

export default Transactions;
