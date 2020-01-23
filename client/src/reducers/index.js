import { combineReducers } from 'redux'
import authReducer from './authReducer'
import itemsReducer from './itemsReducer'
import userItemsReducer from './userItemsReducer'
import itemReducer from './itemReducer'
import loadingReducer from './loadingReducer'
import { reducer as reduxForm} from 'redux-form'

export default combineReducers({
  user: authReducer,
  form: reduxForm,
  items: itemsReducer,
  userItems: userItemsReducer,
  item: itemReducer,
  loading: loadingReducer
});
