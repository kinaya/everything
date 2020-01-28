import { combineReducers } from 'redux'
import authReducer from './authReducer'
import itemsReducer from './itemsReducer'
import loadingReducer from './loadingReducer'
import profilesReducer from './profilesReducer';
import routeStateReducer from './routeStateReducer';
import { reducer as reduxForm} from 'redux-form'

export default combineReducers({
  user: authReducer,
  form: reduxForm,
  items: itemsReducer,
  loading: loadingReducer,
  users: profilesReducer,
  routeState: routeStateReducer
});
