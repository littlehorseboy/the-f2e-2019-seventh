import React, { useState } from 'react';
import classNames from 'classnames';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import SearchIcon from '@material-ui/icons/Search';
import UsersSvgIcon from '../../components/icons/UsersSvgIcon/UsersSvgIcon';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useStyles = makeStyles((theme) => createStyles({
  root: {
    display: 'flex',
  },
  sideBar: {
    backgroundColor: '#303030',
    minHeight: '100vh',
    flexBasis: 360,
    transition: 'flex-basis 0.5s ease',
    '&.hide': {
      flexBasis: 50,
    },
  },
  main: {
    minHeight: '100vh',
    flexBasis: '100%',
    transition: 'flex-basis 0.5s ease',
  },
  title: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  titleContainer: {
    flexBasis: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&.sideBarHide': {
      flexDirection: 'column',
    },
    '& > svg': {
      fontSize: '1.2rem',
      marginLeft: theme.spacing(),
      marginRight: theme.spacing(),
    },
  },
  toolbar: {
    height: 'calc(100% - 72px - 52px)',
  },
  buttonContainer: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    '& > button': {
      borderRadius: 0,
      '&:not(:last-child)': {
        marginRight: theme.spacing(),
      },
    },
  },
  textFieldContainer: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
  textField: {
    borderRadius: 16,
    backgroundColor: '#1E1E1E',
    '& input.MuiOutlinedInput-input': {
      paddingTop: theme.spacing(),
      paddingBottom: theme.spacing(),
    },
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      borderRadius: 16,
    },
  },
  newChatRoomContainer: {
    padding: theme.spacing(),
  },
}));

export default function ChatRoomsPage(): JSX.Element {
  const classes = useStyles();

  const [sideBarVisible, setSideBarVisible] = useState(false);

  const [searchString, setSearchString] = useState('');

  const handleChangeSearchString = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchString(event.target.value);
  };

  return (
    <div className={classes.root}>
      <div className={classNames(classes.sideBar, { hide: sideBarVisible })}>
        <div className={classes.title}>
          <div className={classNames(classes.titleContainer, { sideBarHide: sideBarVisible })}>
            <UsersSvgIcon fill="#d4d4d4" />
            {!sideBarVisible
              ? (
                <div>聊天大廳</div>
              )
              : (
                <>
                  <div>聊</div>
                  <div>天</div>
                  <div>大</div>
                  <div>廳</div>
                </>
              )}
            {sideBarVisible && (
              <IconButton
                aria-label="Right"
                color="primary"
                onClick={(): void => setSideBarVisible(!sideBarVisible)}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            )}
          </div>
          {!sideBarVisible && (
            <IconButton
              aria-label="Left"
              color="primary"
              onClick={(): void => setSideBarVisible(!sideBarVisible)}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
          )}
        </div>

        {!sideBarVisible && (
          <>
            <div className={classes.toolbar}>
              <div className={classes.buttonContainer}>
                <Button
                  color="primary"
                  variant="outlined"
                >
                  隨機1對1配對
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                >
                  隨機進入群組
                </Button>
              </div>

              <div className={classes.textFieldContainer}>
                <TextField
                  className={classes.textField}
                  value={searchString}
                  onChange={handleChangeSearchString}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  placeholder="搜尋聊天室名稱或編號"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div>公開聊天室</div>
              <div style={{ overflowY: 'auto', height: 240 }}>
                <div>123</div>
                <div>123</div>
                <div>123</div>
                <div>123</div>
                <div>123</div>
                <div>123</div>
                <div>123</div>
                <div>123</div>
                <div>123</div>
                <div>123</div>
                <div>123</div>
                <div>123</div>
                <div>123</div>
              </div>

              <div>最近加入的聊天室</div>
              <div style={{ overflowY: 'auto', height: 240 }}>
                <div>123</div>
                <div>123</div>
                <div>123</div>
                <div>123</div>
                <div>123</div>
                <div>123</div>
                <div>123</div>
                <div>123</div>
                <div>123</div>
                <div>123</div>
                <div>123</div>
                <div>123</div>
                <div>123</div>
              </div>
            </div>

            <div className={classes.newChatRoomContainer}>
              <Button
                color="primary"
                variant="outlined"
                fullWidth
              >
                新增聊天室
              </Button>
            </div>
          </>
        )}
      </div>

      <div className={classes.main}>
        <div>
          <div>ヽ(✿ﾟ▽ﾟ)ノ</div>
          <div>馬上開始你的聊天吧~</div>
          <div>
            <Button
              color="primary"
              variant="outlined"
              fullWidth
            >
              隨機1對1配對
            </Button>
          </div>
          <div>
            <Button
              color="primary"
              variant="outlined"
              fullWidth
            >
              隨機進入群組
            </Button>
          </div>
          <div>
            <Button
              color="primary"
              variant="outlined"
              fullWidth
            >
              新增聊天室
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
