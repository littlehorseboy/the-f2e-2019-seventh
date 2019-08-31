import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import SearchIcon from '@material-ui/icons/Search';
import UsersSvgIcon from '../../components/icons/UsersSvgIcon/UsersSvgIcon';
import AddChatRoomButton from '../../components/AddChatRoomButton/AddChatRoomButton';
import { storeTypes } from '../../reducers/configureStore';
import { ChatRoomsI } from '../../reducers/chatRooms/chatRooms';

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
    textAlign: 'center',
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
      borderRadius: 20,
    },
  },
  chatRoomsContainer: {
    '& > div:nth-child(1)': {
      backgroundColor: '#414141',
      padding: theme.spacing(1, 3),
    },
    '& > div:nth-child(2)': {
      overflowY: 'auto',
      height: 240,
      '& div.MuiButtonBase-root': {
        paddingTop: 0,
        paddingBottom: 0,
      },
      '& div.MuiListItemText-root > span': {
        fontSize: '0.8rem',
      },
    },
  },
  newChatRoomContainer: {
    padding: theme.spacing(),
  },
  mainButtonContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > div': {
      textAlign: 'center',
      '& > div': {
        marginTop: theme.spacing(),
        marginBottom: theme.spacing(),
        '& > button': {
          borderRadius: 0,
        },
      },
    },
  },
}));

export default function ChatRoomsPage(): JSX.Element {
  const classes = useStyles();

  const [sideBarVisible, setSideBarVisible] = useState(false);

  const [searchString, setSearchString] = useState('');

  const handleChangeSearchString = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchString(event.target.value);
  };

  const loginName = useSelector((
    state: storeTypes,
  ): string => state.loginReducer.name);

  const [tabValue, setTabValue] = React.useState(1);

  function handleChangeTabValue(event: React.ChangeEvent<{}>, newValue: number): void {
    setTabValue(newValue);
  }

  const chatRooms = useSelector((
    state: storeTypes,
  ): ChatRoomsI['chatRooms'] => state.chatRoomsReducer.chatRooms);

  const [recentChatRooms, setRecentChatRooms] = useState<{ id: number; messages: string[] }[]>([]);

  const [openChatRooms, setOpenChatRooms] = useState<number[]>([]);

  const increaseOpenChatRoom = (id: number): void => {
    setOpenChatRooms([
      ...openChatRooms,
      id,
    ]);

    setTabValue(id);
  };

  const increaseRecentChatRoom = (id: number): void => {
    setRecentChatRooms([
      ...recentChatRooms,
      {
        id,
        messages: [],
      },
    ]);
  };

  const pushRecentChatRoomMessages = (id: number, message: string): void => {
    const foundRecentChatRoom = recentChatRooms
      .find((chatRoom): boolean => chatRoom.id === id);

    if (foundRecentChatRoom) {
      foundRecentChatRoom.messages.push(message);

      setRecentChatRooms([
        ...recentChatRooms
          .filter((chatRoom): boolean => chatRoom.id !== id),
        foundRecentChatRoom,
      ]);
    }
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

              <div className={classes.chatRoomsContainer}>
                <div>{`公開聊天室(${chatRooms.length})`}</div>
                <List component="div">
                  {chatRooms.map((chatRoom): JSX.Element => (
                    <ListItem key={chatRoom.id} button>
                      <ListItemText primary={chatRoom.name} />
                      <ListItemSecondaryAction>
                        {`${chatRoom.people.length} / ${chatRoom.upperLimit}`}
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </div>

              <div className={classes.chatRoomsContainer}>
                <div>最近加入的聊天室(19)</div>
                <List component="div">
                  {chatRooms
                    .filter((chatRoom): boolean => recentChatRooms
                      .map((recentChatRoom): number => recentChatRoom.id).includes(chatRoom.id))
                    .map((chatRoom): JSX.Element => (
                      <ListItem key={chatRoom.id} button>
                        <ListItemText primary={chatRoom.name} />
                        <ListItemSecondaryAction>
                          {`${chatRoom.people.length} / ${chatRoom.upperLimit}`}
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                </List>
              </div>
            </div>

            <div className={classes.newChatRoomContainer}>
              <AddChatRoomButton
                increaseRecentChatRoom={increaseRecentChatRoom}
                increaseOpenChatRoom={increaseOpenChatRoom}
              />
            </div>
          </>
        )}
      </div>

      <div className={classes.main}>
        {/* <div className={classes.mainButtonContainer}>
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
              <AddChatRoomButton
                increaseRecentChatRoom={increaseRecentChatRoom}
                increaseOpenChatRoom={increaseOpenChatRoom}
              />
            </div>
          </div>
        </div> */}
        <AppBar position="static">
          <Tabs value={tabValue} onChange={handleChangeTabValue} aria-label="tabs">
            {openChatRooms.map((openChatRoomId): JSX.Element => {
              const foundChatRoom = chatRooms
                .find((chatRoom): boolean => chatRoom.id === openChatRoomId);
              return (
                <Tab
                  key={openChatRoomId}
                  value={openChatRoomId}
                  label={foundChatRoom && foundChatRoom.name}
                />
              );
            })}
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </AppBar>

        {openChatRooms.map((openChatRoomId): JSX.Element => {
          const foundRecentChatRoom = recentChatRooms
            .find((chatRoom): boolean => chatRoom.id === openChatRoomId);
          return (
            <div
              key={openChatRoomId}
              hidden={tabValue !== openChatRoomId}
            >
              Item spec
              {foundRecentChatRoom && foundRecentChatRoom.messages.map((message): JSX.Element => (
                <div key={message}>{message}</div>
              ))}

              <Button
                variant="contained"
                color="primary"
                onClick={(): void => pushRecentChatRoomMessages(openChatRoomId, '123')}
              >
                123
              </Button>
            </div>
          );
        })}
        <div hidden={tabValue !== 0}>
          Item One
        </div>
        <div hidden={tabValue !== 1}>
          Item Two
        </div>
        <div hidden={tabValue !== 2}>
          Item Three
        </div>
      </div>
    </div>
  );
}
