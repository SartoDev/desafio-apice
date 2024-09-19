import type { AppProps } from "next/app";
import "../app/globals.css";
import Header from "@/components/header";
import { createTheme, ThemeProvider } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { LocalizationProvider } from "@mui/x-date-pickers";

const theme = createTheme({
  palette: {
    text: {
      primary: "#FFFFFF",
      secondary: "#FFFFFF",
    },
    success: {
      main: blue[500],
    },
    primary: {
      main: blue[500],
    },
    secondary: {
      main: red[500],
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
    </ThemeProvider>
  );
}
