import { FETCH_USER_ITEMS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_USER_ITEMS:
      return action.payload;
    default:
      return state;
  }
}
