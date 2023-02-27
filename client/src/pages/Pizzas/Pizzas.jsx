import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../components/layout/MetaData";
import PizzaCard from "../../components/PizzaCard/PizzaCard";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Loader from "../../components/layout/Loader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./Pizzas.css";
import { getAllPizza } from "../../actions/pizzaAction";
import Layout from "../../components/layout/Layout";

const categories = [
  "cheese",
  "Kids",
  "light",
  "meat",
  "Piquant",
  "Sea Food",
  "viggie",
];

const Pizzas = () => {
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const navigate = useNavigate();

  const {
    loading,
    error,
    pizzas,
    pizzaCount,
    resultPerPage,
    filteredPizzaCount,
  } = useSelector((state) => state.pizzas);

  useEffect(() => {
    <MetaData title="Menu-Pizzario" />;
  }, []);

  const [searchWord, setSearchWord] = useState("");

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      MySwal.fire({
        title: "Error!",
        text: `${error}`,
        icon: "error",
        confirmButtonText: "Close",
      });
      dispatch({ type: "CLEAR_ERRORS" });
    }
    dispatch(getAllPizza(keyword, currentPage, category, ratings));
  }, [currentPage, dispatch, keyword, price, category, ratings, error, alert]);

  let count = filteredPizzaCount;

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (searchWord.trim()) {
      navigate(`/pizzas/${searchWord}`);
    } else {
      navigate("/pizzas");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Layout>
          <Fragment>
            {/* <MetaData title="Menu -- Sahouane Store" /> */}
            <h2 className="pizzasHeading">Menu</h2>
            <Fragment>
              <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                  type="text"
                  placeholder="Search a Product ..."
                  onChange={(e) => setSearchWord(e.target.value)}
                />
                <input type="submit" value="Search" />
              </form>
            </Fragment>
            <div className="pizzas">
              {pizzas &&
                pizzas?.map((pizza) => (
                  <PizzaCard key={pizza._id} pizza={pizza} />
                ))}
            </div>

            <div className="filterBox">
              <Typography>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
                size="small"
                color="primary"
              />
              <Typography>Categories</Typography>
              <ul className="categoryBox">
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
              <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </fieldset>
            </div>

            <div className="paginationBox">
              {resultPerPage < pizzaCount && (
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={pizzaCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              )}
            </div>
          </Fragment>
        </Layout>
      )}
    </Fragment>
  );
};

export default Pizzas;