import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Router from './router/Router';
import store from './reducers/configureStore';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#D4D4D4',
    },
    secondary: {
      main: '#D7BA7D',
    },
  },
  typography: {
    fontFamily: 'Consolas, Regular, system-ui, -apple-system, "Roboto", "Helvetica", "Arial", sans-serif',
  },
  overrides: {
    MuiInputBase: {
      root: {
        color: '#6C6C6C',
      },
    },
    MuiInput: {
      underline: {
        '&::before': {
          borderBottomColor: '#6C6C6C',
        },
      },
    },
  },
});

export default function Root(): JSX.Element {
  return (
    <>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router />
        </Provider>
      </MuiThemeProvider>
    </>
  );
}
