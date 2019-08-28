import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { storeTypes } from '../../reducers/configureStore';
import { setName } from '../../actions/login/login';

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

  const dispatch = useDispatch();

  useEffect((): void => {
    // 還原為預設值
    dispatch(setName('anonymous'));
  }, []);

  const [isAnonymous, setIsAnonymous] = useState<null | boolean>(null);

  const [fieldName, setFieldName] = useState('');

  const handleChangeFieldName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFieldName(event.target.value);
  };

  const name = useSelector((
    state: storeTypes,
  ): string => state.loginReducer.name);

  const handleClickSetName = (): void => {
    if (!fieldName) {
      alert('請輸入名字');
    } else {
      dispatch(setName(fieldName));
    }
  };

  return (
    <div className={classes.root}>
      {isAnonymous === null && (
        <div className={classes.choiceContainer}>
          <Button
            color="secondary"
            onClick={(): void => setIsAnonymous(true)}
          >
            [匿名聊天]
          </Button>
          <Button
            color="primary"
            onClick={(): void => setIsAnonymous(false)}
          >
            [暱稱聊天]
          </Button>
        </div>
      )}

      {isAnonymous === false && name === 'anonymous' && (
        <div className={classes.choiceContainer}>
          <Typography className={classes.title}>暱稱聊天</Typography>
          <TextField
            value={fieldName}
            onChange={handleChangeFieldName}
            placeholder="輸入暱稱"
          />
          <Button
            color="primary"
            onClick={handleClickSetName}
          >
            [確定]
          </Button>
        </div>
      )}

      {(isAnonymous === true || name !== 'anonymous') && (
        <div className={classes.choiceContainer}>
          <Button color="primary">[隨機配對1對1聊天]</Button>
          <Link to="/chatRoom">
            <Button color="primary">[進入聊天大廳]</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
