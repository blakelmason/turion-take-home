import { createTheme, responsiveFontSizes } from "@mui/material";

const themeBase = createTheme({
  palette: {
    mode: "dark",
  },
});

export const theme = responsiveFontSizes(themeBase);
