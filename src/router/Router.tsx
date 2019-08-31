import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Login from '../pages/Login/Login';
import ChatRoomsPage from '../pages/ChatRoomsPage/ChatRoomsPage';

const routes = [
  { from: '/', redirectTo: '/login' },
  { path: '/login', name: 'login', Component: Login },
  { path: '/chatRoom', name: 'chatRoom', Component: ChatRoomsPage },
  { path: '/chatRoom/:id', name: 'chatRoom', Component: ChatRoomsPage },
];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useStyles = makeStyles(() => createStyles({
  root: {
    fontFamily: 'Consolas, Regular, system-ui, -apple-system, "Roboto", "Helvetica", "Arial", sans-serif',
    backgroundColor: '#1E1E1E',
    minHeight: '100vh',
    color: '#D4D4D4',
  },
}));

export default function Router(): JSX.Element {
  const classes = useStyles();

  return (
    <HashRouter>
      <div className={classes.root}>
        {routes.map(({
          path, Component, from, redirectTo,
        }): JSX.Element => (
          <>
            {(from && redirectTo) && <Redirect from={from} to={redirectTo} />}
            <Route key={path} exact path={path} component={Component} />
          </>
        ))}
      </div>
    </HashRouter>
  );
}
