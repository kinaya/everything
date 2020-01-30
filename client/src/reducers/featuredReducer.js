import { FETCH_FEATURED_ITEMS } from '../actions/types';

export default function(state = false, action) {
  switch (action.type) {
    case FETCH_FEATURED_ITEMS:
      return action.payload;
    default:
      return state;
  }
}
