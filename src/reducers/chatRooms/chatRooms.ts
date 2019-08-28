import maxBy from 'lodash/maxBy';
import { chatRoomsActionTypes, ADDCHATROOM } from '../../actions/chatRooms/chatRooms';

interface ChatRoomsI {
  chatRooms: {
    id: number;
    name: string;
    password: string;
    isPrivate: boolean;
    upperLimit: number;
    people: string[];
    messages: {
      order: number;
      spokesman: string;
      message: string;
    }[];
  }[];
}

const initState: ChatRoomsI = {
  chatRooms: [
    {
      id: 1,
      name: '',
      password: '',
      isPrivate: false,
      upperLimit: 10,
      people: ['Arial'],
      messages: [
        { order: 1, spokesman: 'Arial', message: '' },
      ],
    },
  ],
};

const reducer = (state = initState, action: chatRoomsActionTypes): ChatRoomsI => {
  const calculateMaxId = maxBy(state.chatRooms, (chatRoom): number => chatRoom.id);
  const newId = calculateMaxId ? calculateMaxId.id + 1 : 1;

  switch (action.type) {
    case ADDCHATROOM:
      return {
        chatRooms: [
          {
            id: newId,
            name: action.payload.name,
            password: action.payload.password,
            isPrivate: action.payload.isPrivate,
            upperLimit: action.payload.upperLimit,
            people: action.payload.people,
            messages: [],
          },
        ],
      };
    default:
      return state;
  }
};

export default reducer;
