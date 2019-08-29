import { loginActionTypes, SETNAME } from '../../actions/login/login';

interface IsLoadingI {
  name: 'anonymous' | string;
  messages: {
    chatRoomId: number;
    order: number;
    spokesman: string;
    message: string;
  }[];
}

const initState: IsLoadingI = {
  name: 'anonymous',
  messages: [
    // {
    //   chatRoomId: 1, order: 1, spokesman: 'anonymous', message: '',
    // },
  ],
};

const reducer = (state = initState, action: loginActionTypes): IsLoadingI => {
  switch (action.type) {
    case SETNAME:
      return {
        ...state,
        name: action.payload.name,
      };
    default:
      return state;
  }
};

export default reducer;
