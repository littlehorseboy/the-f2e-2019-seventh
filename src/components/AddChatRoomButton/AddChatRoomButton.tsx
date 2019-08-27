import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useStyles = makeStyles((theme) => createStyles({
  dialog: {
    '& > div.MuiPaper': {
      backgroundColor: '#252526',
    },
  },
  dialogContainer: {
    padding: theme.spacing(3, 6),
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
        className={classes.dialog}
      >
        <div className={classes.dialogContainer}>
          <div>新增聊天室</div>
          <div>新增聊天室</div>
          <div>限制</div>
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
