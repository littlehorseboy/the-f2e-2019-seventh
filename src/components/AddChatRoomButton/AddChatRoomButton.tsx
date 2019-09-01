import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import maxBy from 'lodash/maxBy';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { addChatRoom } from '../../actions/chatRooms/chatRooms';
import { storeTypes } from '../../reducers/configureStore';
import { ChatRoomsI } from '../../reducers/chatRooms/chatRooms';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useStyles = makeStyles((theme) => createStyles({
  paper: {
    fontFamily: 'Consolas, Regular, system-ui, -apple-system, "Roboto", "Helvetica", "Arial", sans-serif',
    backgroundColor: '#252526',
  },
  dialogContainer: {
    padding: theme.spacing(3, 6),
    color: '#D4D4D4',
    '& > form > h2:first-child': {
      color: '#9CDCFE',
      textAlign: 'center',
    },
    '& > form > div': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  formControl: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
  },
  muiSelectRoot: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  muiSelectIcon: {
    color: '#D4D4D4',
  },
  muiOutlined: {
    borderColor: '#D4D4D4',
  },
  muiCheckbox: {
    padding: theme.spacing(0),
    marginRight: theme.spacing(0.5),
    color: '#D4D4D4',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    '& > button': {
      marginTop: theme.spacing(3),
      fontSize: '1.2rem',
    },
  },
}));

const UASCatalogSchema = Yup.object().shape({
  name: Yup.string()
    .required('必填'),
});

interface PropsI {
  increaseRecentChatRoom: (id: number) => void;
  openChatRoom: (id: number) => void;
}

export default function AddChatRoomButton(props: PropsI): JSX.Element {
  const classes = useStyles();

  const { increaseRecentChatRoom, openChatRoom } = props;

  const [open, setOpen] = useState(false);

  function handleClickOpen(): void {
    setOpen(true);
  }

  function handleClose(): void {
    setOpen(false);
  }

  const chatRooms = useSelector((
    state: storeTypes,
  ): ChatRoomsI['chatRooms'] => state.chatRoomsReducer.chatRooms);

  const name = useSelector((
    state: storeTypes,
  ): string => state.loginReducer.name);

  const dispatch = useDispatch();

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        fullWidth
        onClick={handleClickOpen}
      >
        新增聊天室
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        classes={{
          paper: classes.paper,
        }}
      >
        <div className={classes.dialogContainer}>
          <Formik
            initialValues={{
              name: '',
              upperLimit: 2,
              checked: false,
              password: '',
              isPrivate: 0,
            }}
            validationSchema={UASCatalogSchema}
            onSubmit={(values, actions): void => {
              const calculateMaxId = maxBy(chatRooms, (chatRoom): number => chatRoom.id);
              const newId = calculateMaxId ? calculateMaxId.id + 1 : 1;

              dispatch(addChatRoom(
                values.name,
                values.checked ? values.password : '',
                values.isPrivate === 1,
                values.upperLimit,
                [name],
              ));
              increaseRecentChatRoom(newId);
              openChatRoom(newId);
              actions.setSubmitting(false);
              handleClose();
            }}
          >
            {({
              values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,
              setFieldValue,
            }): JSX.Element => (
              <form onSubmit={handleSubmit}>
                <h2>新增聊天室</h2>

                <TextField
                  placeholder="聊天室名稱"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.name && touched.name && errors.name}
                  error={!!(errors.name && touched.name && errors.name)}
                  fullWidth
                  margin="dense"
                />

                <div>
                  限制
                  <FormControl variant="outlined" margin="dense" className={classes.formControl}>
                    <Select
                      native
                      classes={{
                        root: classes.muiSelectRoot,
                        icon: classes.muiSelectIcon,
                      }}
                      name="upperLimit"
                      value={values.upperLimit}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!(errors.upperLimit && touched.upperLimit && errors.upperLimit)}
                      input={(
                        <OutlinedInput
                          id="outlined-input"
                          labelWidth={0}
                          classes={{ notchedOutline: classes.muiOutlined }}
                        />
                      )}
                    >
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </Select>
                  </FormControl>
                  人
                  <span>(上限5人)</span>
                </div>
                <div>
                  <Checkbox
                    className={classes.muiCheckbox}
                    name="checked"
                    value={values.checked}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  設密碼
                  <TextField
                    placeholder="******"
                    name="password"
                    value={values.password}
                    onChange={(event): void => {
                      if (event.target.value) {
                        // 下面這段可以成功改值 但是 checkbox 不會被切換 原因不明
                        // setFieldValue('checked', true);
                      }
                      handleChange(event);
                    }}
                    onBlur={handleBlur}
                    margin="dense"
                  />
                </div>
                <div>
                  <FormControl variant="outlined" margin="dense" className={classes.formControl}>
                    <Select
                      native
                      classes={{
                        root: classes.muiSelectRoot,
                        icon: classes.muiSelectIcon,
                      }}
                      name="isPrivate"
                      value={values.isPrivate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!(errors.isPrivate && touched.isPrivate && errors.isPrivate)}
                      input={(
                        <OutlinedInput
                          labelWidth={0}
                          classes={{ notchedOutline: classes.muiOutlined }}
                        />
                      )}
                    >
                      <option value={0}>公開</option>
                      <option value={1}>私密</option>
                    </Select>
                  </FormControl>
                </div>
                <div style={{ color: '#6A9955' }}>// 公開: 顯示在聊天大廳任何人都能加入</div>
                <div style={{ color: '#6A9955' }}>// 私密: 只能用搜尋聊天室才能找到</div>
                <div className={classes.buttonContainer}>
                  <Button type="submit" disabled={isSubmitting} color="primary">[確定]</Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Dialog>
    </>
  );
}
