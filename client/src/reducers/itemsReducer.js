import { FETCH_ITEMS } from '../actions/types';

export default function(state = false, action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return action.payload;
    default:
      return state;
  }
}
