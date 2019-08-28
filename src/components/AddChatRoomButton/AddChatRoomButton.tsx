import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useStyles = makeStyles((theme) => createStyles({
  paper: {
    fontFamily: 'Consolas, Regular, system-ui, -apple-system, "Roboto", "Helvetica", "Arial", sans-serif',
    backgroundColor: '#252526',
  },
  dialogContainer: {
    padding: theme.spacing(3, 6),
    color: '#D4D4D4',
    '& > h2:first-child': {
      color: '#9CDCFE',
      textAlign: 'center',
    },
    '& > div': {
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

export default function AddChatRoomButton(): JSX.Element {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  function handleClickOpen(): void {
    setOpen(true);
  }

  function handleClose(): void {
    setOpen(false);
  }

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
          <h2>新增聊天室</h2>
          <TextField
            placeholder="聊天室名稱"
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
                value={12}
                // onChange={handleChange('age')}
                input={(
                  <OutlinedInput
                    labelWidth={0}
                    classes={{ notchedOutline: classes.muiOutlined }}
                  />
                )}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </Select>
            </FormControl>
            人
            <span>(上限10人)</span>
          </div>
          <div>
            <Checkbox
              className={classes.muiCheckbox}
            />
            設密碼
            <TextField
              placeholder="XXXX"
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
                value={12}
                // onChange={handleChange('age')}
                input={(
                  <OutlinedInput
                    labelWidth={0}
                    classes={{ notchedOutline: classes.muiOutlined }}
                  />
                )}
              >
                <option value={1}>公開</option>
                <option value={2}>私密</option>
              </Select>
            </FormControl>
          </div>
          <div style={{ color: '#6A9955' }}>// 公開: 顯示在聊天大廳任何人都能加入</div>
          <div style={{ color: '#6A9955' }}>// 私密: 只能用搜尋聊天室才能找到</div>
          <div className={classes.buttonContainer}>
            <Button color="primary">[確定]</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
