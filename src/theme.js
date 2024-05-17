import { createMuiTheme as createTheme } from '@material-ui/core';

const theme = createTheme({
    typography: {
        fontFamily: ['anakotmai', 'san-serif'].join(',')
    },
    palette: {
      primary: {
          main: "rgb(203, 150, 194)",
        },
        secondary: {
            main: "#fff",
          },
    },
});

export default theme;