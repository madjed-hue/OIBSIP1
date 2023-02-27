import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { getAllCheese } from "../../actions/cheeseAction";
import { useAlert } from "react-alert";

const Cheese = ({ setCheeseId }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [cheese, setCheese] = useState("");
  const [price, setPrice] = useState(0);

  const { error, cheeses } = useSelector((state) => state.cheeses);

  const handleChange = (e) => {
    setCheese(e.target.value);
    setPrice(e.target.value);
    const slectedCheese = cheeses?.find(
      (cheese) => cheese.price === e.target.value
    );
    setCheeseId(slectedCheese._id);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    dispatch(getAllCheese());
  }, [alert, dispatch, error]);
  return (
    <Box
      sx={{ minWidth: 120, display: "flex", alignItems: "center", mt: "15px" }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Cheese</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cheese}
          label="Cheese"
          onChange={handleChange}
        >
          <MenuItem value="0" onSelect={() => setPrice(0)}>
            <em>Select Cheese type</em>
          </MenuItem>
          {cheeses &&
            cheeses.map((cheese) => (
              <MenuItem value={cheese.price} key={cheese._id}>
                {cheese.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <span className="cheese-price">{price}$</span>
    </Box>
  );
};

export default Cheese;
