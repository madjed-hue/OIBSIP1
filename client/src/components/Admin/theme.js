import { useMemo } from "react";

import { createTheme } from "@mui/material/styles";

// mui theme settings
export const themeSettings = () => {
  return {
    typography: {
      fontSize: 12,
      h1: {
        fontSize: 40,
      },
      h2: {
        fontSize: 32,
      },
      h3: {
        fontSize: 24,
      },
      h4: {
        fontSize: 20,
      },
      h5: {
        fontSize: 16,
      },
      h6: {
        fontSize: 14,
      },
    },
  };
};

export const useTheme = () => {
  const theme = useMemo(() => createTheme(themeSettings()), []);

  return [theme];
};
