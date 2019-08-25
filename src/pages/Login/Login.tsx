import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useStyles = makeStyles((theme) => createStyles({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  choiceContainer: {
    width: 250,
    height: 250,
    backgroundColor: '#252526',
    boxShadow: '0px 3px 30px #000000',
    border: '1px solid #252526',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      fontSize: '1rem',
      margin: theme.spacing(),
    },
  },
  title: {
    color: '#9CDCFE',
    fontSize: 20,
  },
}));

export default function Login(): JSX.Element {
  const classes = useStyles();

  const [isAnonymous, setIsAnonymous] = useState<null | boolean>(null);

  return (
    <div className={classes.root}>
      <div className={classes.choiceContainer}>
        <Button color="secondary">[匿名聊天]</Button>
        <Button color="primary">[暱稱聊天]</Button>
      </div>
      <div className={classes.choiceContainer}>
        <Typography className={classes.title}>暱稱聊天</Typography>
        <TextField
          placeholder="輸入暱稱"
        />
        <Button color="primary">[確定]</Button>
      </div>
      <div className={classes.choiceContainer}>
        <Button color="primary">[隨機配對1對1聊天]</Button>
        <Button color="primary">[進入聊天大廳]</Button>
      </div>
    </div>
  );
}
