import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import uuidv4 from 'uuid/v4';
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
import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import BuildIcon from '@material-ui/icons/Build';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import PhotoIcon from '@material-ui/icons/Photo';
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
  tabs: {
    backgroundColor: '#303030',
    color: '#D4D4D4',
    '& .MuiTab-root': {
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
    },
    '& .MuiTab-root.Mui-selected': {
      backgroundColor: '#1E1E1E',
    },
  },
  tabLabel: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    '& > div:first-child': {
      flexGrow: 1,
    },
    '& > div:nth-child(2)': {
      '& > div': {
        display: 'flex',
        alignItems: 'center',
        '& svg': {
          fontSize: '1rem',
        },
      },
    },
  },
  messagesContainer: {
    minHeight: 'calc(100vh - 48px)',
    display: 'flex',
    flexDirection: 'column',
    '&.hide': {
      display: 'none',
    },
    '& > div:first-child': {
      height: 'calc(100vh - 48px - 240px)',
      padding: theme.spacing(2),
      overflowY: 'auto',
    },
    '& > div:nth-child(2)': {
      height: 240,
      display: 'flex',
      flexDirection: 'column',
      '& > div:nth-child(2)': {
        padding: theme.spacing(2),
      },
    },
  },
  messageToolbar: {
    backgroundColor: '#303030',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '& > div': {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(),
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      display: 'flex',
      alignItems: 'center',
    },
  },
  messageTextArea: {
    flexGrow: 1,
  },
  messageTextAreaButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

interface RecentChatRoomI {
  id: number;
  messages: {
    id: string;
    name: string;
    message: string;
    sendTime: Date;
  }[];
}

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

  const [tabValue, setTabValue] = React.useState<number | null>(null);

  function handleChangeTabValue(event: React.ChangeEvent<{}>, newValue: number): void {
    setTabValue(newValue);
  }

  const chatRooms = useSelector((
    state: storeTypes,
  ): ChatRoomsI['chatRooms'] => state.chatRoomsReducer.chatRooms);

  const [recentChatRooms, setRecentChatRooms] = useState<RecentChatRoomI[]>([]);

  const [openChatRooms, setOpenChatRooms] = useState<number[]>([]);

  const pushRecentChatRoomMessages = (id: number, message: string): void => {
    const foundRecentChatRoom = recentChatRooms
      .find((chatRoom): boolean => chatRoom.id === id);

    if (foundRecentChatRoom) {
      foundRecentChatRoom.messages.push({
        id: uuidv4(),
        name: loginName,
        message,
        sendTime: new Date(),
      });

      setRecentChatRooms([
        ...recentChatRooms
          .filter((chatRoom): boolean => chatRoom.id !== id),
        foundRecentChatRoom,
      ]);
    }
  };

  const decreaseOpenChatRoom = (id: number): void => {
    setOpenChatRooms(
      openChatRooms.filter((openChatRoomId): boolean => openChatRoomId !== id),
    );

    setTabValue(null);
  };

  const increaseRecentChatRoom = (id: number): void => {
    setRecentChatRooms([
      ...recentChatRooms,
      {
        id,
        messages: [{
          id: uuidv4(),
          name: loginName,
          message: `
            <span style="color: #6C6C6C;">${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}</span>
            <span style="color: #6C6C6C;"><</span><span style="color: #499CD6;">link</span>
            <span style="color: #9CDCFE;">rel</span><span>=</span><span style="color: #CE9178;">"random"</span>
            <span style="color: #9CDCFE;">href</span><span>=</span><span style="color: #CE9178;">"${loginName}已進入聊天室"</span><span>></span>
          `,
          sendTime: new Date(),
        }],
      },
    ]);
  };

  const openChatRoom = (id: number): void => {
    const foundRecentChatRoom = recentChatRooms
      .find((chatRoom): boolean => chatRoom.id === id);
    if (!foundRecentChatRoom) {
      increaseRecentChatRoom(id);
    }

    const foundOpenChatRoom = openChatRooms
      .find((openChatRoomId): boolean => openChatRoomId === id);
    if (!foundOpenChatRoom) {
      setOpenChatRooms([
        ...openChatRooms,
        id,
      ]);
    }

    setTabValue(id);
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
                    <ListItem
                      key={chatRoom.id}
                      button
                      onClick={(): void => openChatRoom(chatRoom.id)}
                    >
                      <ListItemText primary={chatRoom.name} />
                      <ListItemSecondaryAction>
                        {`${chatRoom.people.length} / ${chatRoom.upperLimit}`}
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </div>

              <div className={classes.chatRoomsContainer}>
                <div>{`最近加入的聊天室(${recentChatRooms.length})`}</div>
                <List component="div">
                  {chatRooms
                    .filter((chatRoom): boolean => recentChatRooms
                      .map((recentChatRoom): number => recentChatRoom.id).includes(chatRoom.id))
                    .map((chatRoom): JSX.Element => (
                      <ListItem
                        key={chatRoom.id}
                        button
                        onClick={(): void => openChatRoom(chatRoom.id)}
                      >
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
                openChatRoom={openChatRoom}
              />
            </div>
          </>
        )}
      </div>

      <div className={classes.main}>
        {openChatRooms.length === 0
          ? (
            <div className={classes.mainButtonContainer}>
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
                    openChatRoom={openChatRoom}
                  />
                </div>
              </div>
            </div>
          )
          : (
            <>
              <AppBar position="static">
                <Tabs
                  className={classes.tabs}
                  value={tabValue}
                  onChange={handleChangeTabValue}
                  aria-label="tabs"
                >
                  {tabValue && openChatRooms.map((openChatRoomId): JSX.Element => {
                    const foundChatRoom = chatRooms
                      .find((chatRoom): boolean => chatRoom.id === openChatRoomId);
                    return (
                      <Tab
                        key={openChatRoomId}
                        value={openChatRoomId}
                        label={foundChatRoom && (
                          <div className={classes.tabLabel}>
                            <div>
                              {foundChatRoom.name}
                            </div>
                            <div>
                              <div
                                role="button"
                                tabIndex={0}
                                onClick={(): void => decreaseOpenChatRoom(openChatRoomId)}
                                onKeyPress={(): void => decreaseOpenChatRoom(openChatRoomId)}
                              >
                                <CloseIcon />
                              </div>
                            </div>
                          </div>
                        )}
                      />
                    );
                  })}
                </Tabs>
              </AppBar>

              {openChatRooms.map((openChatRoomId): JSX.Element => {
                const foundRecentChatRoom = recentChatRooms
                  .find((chatRoom): boolean => chatRoom.id === openChatRoomId);
                return (
                  <div
                    key={openChatRoomId}
                    className={classNames(
                      classes.messagesContainer,
                      { hide: tabValue !== openChatRoomId },
                    )}
                  >
                    <div>
                      {foundRecentChatRoom && foundRecentChatRoom.messages
                        .map((message): JSX.Element => (
                          /* eslint-disable react/no-danger */
                          <div
                            key={message.id}
                            dangerouslySetInnerHTML={{
                              __html: message.message,
                            }}
                          />
                          /* eslint-enable */
                        ))}
                    </div>

                    <div>
                      <div className={classes.messageToolbar}>
                        <div>
                          <PersonIcon />
                          1 / 2
                        </div>
                        <div>
                          <LockIcon />
                          私密
                        </div>
                        <div>
                          <BuildIcon />
                        </div>
                      </div>

                      <div className={classes.messageTextArea}>
                        <div>
                          {`${loginName} >`}
                          <TextField
                            multiline
                            rows="3"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                          />
                        </div>
                      </div>
                      <div className={classes.messageTextAreaButtons}>
                        <div>
                          <Button
                            color="primary"
                            onClick={(): void => pushRecentChatRoomMessages(openChatRoomId, '夾帶附件，未實作')}
                          >
                            <AttachFileIcon />
                          </Button>
                          <Button
                            color="primary"
                            onClick={(): void => pushRecentChatRoomMessages(openChatRoomId, '照片上傳，未實作')}
                          >
                            <PhotoIcon />
                          </Button>
                          <Button
                            color="primary"
                            onClick={(): void => pushRecentChatRoomMessages(openChatRoomId, '(ﾟ∀ﾟ)')}
                          >
                            (ﾟ∀ﾟ)
                          </Button>
                        </div>
                        <div>
                          <Button
                            color="primary"
                            onClick={(): void => pushRecentChatRoomMessages(openChatRoomId, '123')}
                          >
                            傳送
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
      </div>
    </div>
  );
}
