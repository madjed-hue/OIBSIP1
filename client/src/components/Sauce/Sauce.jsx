import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getAllSauce } from "../../actions/sauceAction";

const Sauce = ({ setSauceId }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [sauce, setSauce] = useState("");
  const [price, setPrice] = useState(0);

  const { error, sauces } = useSelector((state) => state.sauces);

  const handleChange = (e) => {
    setSauce(e.target.value);
    setPrice(e.target.value);
    const selectedSauce = sauces?.find(
      (sauce) => sauce.price === e.target.value
    );
    setSauceId(selectedSauce._id);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    dispatch(getAllSauce());
  }, [alert, dispatch, error]);
  return (
    <Box
      sx={{ minWidth: 120, display: "flex", alignItems: "center", mt: "15px" }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sauces</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sauce}
          label="Sauce"
          onChange={handleChange}
        >
          <MenuItem value="0" onSelect={() => setPrice(0)}>
            <em>Select Sauce Flavor</em>
          </MenuItem>
          {sauces &&
            sauces.map((sauce) => (
              <MenuItem value={sauce.price} key={sauce._id}>
                {sauce.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <span className="cheese-price">{price}$</span>
    </Box>
  );
};

export default Sauce;
