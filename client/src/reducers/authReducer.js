import { FETCH_USER } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; // If the value is an empty string return false
    default:
      return state;
  }
}
