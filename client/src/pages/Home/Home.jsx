import React, { Fragment, useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import MetaData from "../../components/layout/MetaData";
import PizzaCard from "../../components/PizzaCard/PizzaCard";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import { getAllPizza } from "../../actions/pizzaAction";
import Loader from "../../components/layout/Loader";
import Layout from "../../components/layout/Layout";
import { Box, useMediaQuery } from "@mui/material";
import Specials from "../../components/Home/Specials";
import HomeParallax from "../../components/Home/HomeParallax";
import Services from "../../components/Home/Services";
import MapService from "../../components/Home/Map";

const Home = () => {
  const isMobile = useMediaQuery("(max-width:998px)");
  const isMobileXs = useMediaQuery("(max-width:500px)");
  const dispatch = useDispatch();

  const { loading, pizzas, error } = useSelector((state) => state.pizzas);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    dispatch(getAllPizza());
    <MetaData title="Pizzario" />;
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Layout>
          <div className="home">
            <Banner />
            <div className="second-div">
              <h2 className="homeHeading">Featured Pizzas</h2>
              <div className="container" id="container">
                {pizzas?.length &&
                  pizzas.map((pizza) => (
                    <PizzaCard pizza={pizza} key={pizza._id} />
                  ))}
              </div>
            </div>
            <Specials isMobileXs={isMobileXs} isMobile={isMobile} />
            <HomeParallax isMobile={isMobile} />
            <Services />
            <Box width="100%" height={500} mt={8}>
              <MapService />
            </Box>
          </div>
        </Layout>
      )}
    </Fragment>
  );
};

export default Home;
