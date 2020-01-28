import { CLEAR_ROUTE_STATE, FETCH_ITEM, FETCH_USER_ITEMS, FETCH_PROFILE } from '../actions/types';

const initialState = {
  userItems: false,
  profile: false,
  item: false
}

export default function(state = initialState, action) {
  switch (action.type) {

    case CLEAR_ROUTE_STATE:
      return initialState;

    case FETCH_ITEM:
      return {...state, item: action.payload}

    case FETCH_USER_ITEMS:
      return {...state, userItems: action.payload}

    case FETCH_PROFILE:
      return {...state, profile: action.payload}

    default:
      return state;
  }
}
