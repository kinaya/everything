import { TEMP_IMAGE } from '../actions/types';

export default function(state = false, action) {
  switch (action.type) {
    case TEMP_IMAGE:
      return action.payload;
    default:
      return state;
  }
}
