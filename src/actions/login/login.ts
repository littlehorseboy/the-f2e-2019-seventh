export const SETNAME = 'SETNAME';

interface SetNameI {
  type: typeof SETNAME;
  payload: {
    name: string;
  };
}

export const setName = (name: string): SetNameI => ({
  type: SETNAME,
  payload: {
    name,
  },
});

export type loginActionTypes = SetNameI;
