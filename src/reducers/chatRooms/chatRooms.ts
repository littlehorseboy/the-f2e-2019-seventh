import maxBy from 'lodash/maxBy';
import { chatRoomsActionTypes, ADDCHATROOM } from '../../actions/chatRooms/chatRooms';

export interface ChatRoomsI {
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
      name: '我現在非常懶惰',
      password: '',
      isPrivate: false,
      upperLimit: 2,
      people: ['Baker'],
    },
    {
      id: 2,
      name: '亞馬遜大火到底是為什麼!?',
      password: '',
      isPrivate: false,
      upperLimit: 2,
      people: ['Emma'],
    },
    {
      id: 3,
      name: '求動漫愛好，不是H漫啦',
      password: '',
      isPrivate: false,
      upperLimit: 2,
      people: ['Mike'],
    },
    {
      id: 4,
      name: '非洲豬瘟',
      password: '',
      isPrivate: false,
      upperLimit: 2,
      people: ['Willy'],
    },
    {
      id: 5,
      name: '動得很厲害',
      password: '',
      isPrivate: false,
      upperLimit: 2,
      people: ['Kenny'],
    },
    {
      id: 6,
      name: '最近的香港...',
      password: '',
      isPrivate: false,
      upperLimit: 2,
      people: ['Nerissa'],
    },
    {
      id: 7,
      name: '鬼門關',
      password: '',
      isPrivate: false,
      upperLimit: 2,
      people: ['Nerissa'],
    },
    {
      id: 8,
      name: '極端氣候我們該怎麼辦?',
      password: '',
      isPrivate: false,
      upperLimit: 2,
      people: ['John'],
    },
    {
      id: 9,
      name: '5G競標底價300億貴不貴?',
      password: '',
      isPrivate: false,
      upperLimit: 2,
      people: ['Lucy', 'Otis'],
    },
    {
      id: 10,
      name: '最近機車外送很夯',
      password: '',
      isPrivate: false,
      upperLimit: 2,
      people: ['Louis'],
    },
    {
      id: 11,
      name: '有人想要一起去淨灘嗎?',
      password: '',
      isPrivate: false,
      upperLimit: 2,
      people: ['Louis'],
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
          ...state.chatRooms,
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
