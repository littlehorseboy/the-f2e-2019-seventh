import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useStyles = makeStyles((theme) => createStyles({
  paper: {
    backgroundColor: '#252526',
  },
  dialogContainer: {
    padding: theme.spacing(3, 6),
    color: '#D4D4D4',
    '& > div': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  muiSelectRoot: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(),
  },
  MuiSelectIcon: {
    color: '#D4D4D4',
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
          <h3>新增聊天室</h3>
          <TextField
            placeholder="聊天室名稱"
            fullWidth
            margin="dense"
          />
          <div>
            限制
            <FormControl variant="outlined">
              <Select
                native
                classes={{
                  root: classes.muiSelectRoot,
                  icon: classes.MuiSelectIcon,
                }}
                value={12}
                // onChange={handleChange('age')}
                input={
                  <OutlinedInput labelWidth={0} />
                }
              >
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl>
            人
            <span>(上限10人)</span>
          </div>
          <div>設密碼</div>
          <div>私密</div>
          <div>// 公開: 顯示在聊天大廳任何人都能加入</div>
          <div>// 私密: 只能用搜尋聊天室才能找到</div>
          <div>
            <Button>[確定]</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
