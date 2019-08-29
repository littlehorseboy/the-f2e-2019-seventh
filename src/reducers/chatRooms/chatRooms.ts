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
  }[];
}

const initState: ChatRoomsI = {
  chatRooms: [
    {
      id: 1,
      name: '',
      password: '',
      isPrivate: false,
      upperLimit: 2,
      people: ['Frank Baker'],
    },
    {
      id: 2,
      name: '',
      password: '',
      isPrivate: false,
      upperLimit: 2,
      people: ['Alissa Middleton'],
    },
    {
      id: 3,
      name: '',
      password: '',
      isPrivate: false,
      upperLimit: 2,
      people: ['Bonnie Garrix'],
    },
    {
      id: 4,
      name: '',
      password: '',
      isPrivate: false,
      upperLimit: 2,
      people: ['Eddie Middleton'],
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
          },
        ],
      };
    default:
      return state;
  }
};

export default reducer;
