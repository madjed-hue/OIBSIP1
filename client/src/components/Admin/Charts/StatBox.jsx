import { Box, Typography } from "@mui/material";
// import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon }) => {
  return (
    <Box width="100%" m="0 auto" p="12px 0">
      <Box display="flex" justifyContent="center">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "#141414", textAlign: "center" }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" mt="2px">
        <Typography variant="h5" sx={{ color: "#4cceac" }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
