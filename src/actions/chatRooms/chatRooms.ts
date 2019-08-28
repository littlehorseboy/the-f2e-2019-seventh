export const ADDCHATROOM = 'ADDCHATROOM';

interface AddChatRoomI {
  type: typeof ADDCHATROOM;
  payload: {
    name: string;
    password: string;
    isPrivate: boolean;
    upperLimit: number;
    people: string[];
  };
}

export const addChatRoom = (
  name: string,
  password: string,
  isPrivate: boolean,
  upperLimit: number,
  people: string[],
): AddChatRoomI => ({
  type: ADDCHATROOM,
  payload: {
    name,
    password,
    isPrivate,
    upperLimit,
    people,
  },
});

export type chatRoomsActionTypes = AddChatRoomI;
