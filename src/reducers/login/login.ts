import { loginActionTypes, SETNAME } from '../../actions/login/login';

interface IsLoadingI {
  name: 'anonymous' | string;
}

const initState: IsLoadingI = {
  name: 'anonymous',
};

const reducer = (state = initState, action: loginActionTypes): IsLoadingI => {
  switch (action.type) {
    case SETNAME:
      return {
        name: action.payload.name,
      };
    default:
      return state;
  }
};

export default reducer;
