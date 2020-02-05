import { UPDATE_POSITION } from '../actions/types';

export default function(state = false, action) {
  switch (action.type) {
    case UPDATE_POSITION:
      return action.payload;
    default:
      return state;
  }
}
