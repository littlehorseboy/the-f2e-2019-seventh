import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Login from '../pages/Login/Login';
import ChatRoomsPage from '../pages/ChatRoomsPage/ChatRoomsPage';

const routes = [
  { path: '/login', name: 'login', Component: Login },
  { path: '/chatRoom/:id', name: 'chatRoom', Component: ChatRoomsPage },
];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useStyles = makeStyles(() => createStyles({
  root: {
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
        {routes.map(({ path, Component }): JSX.Element => (
          <Route key={path} exact path={path} component={Component} />
        ))}
      </div>
    </HashRouter>
  );
}
