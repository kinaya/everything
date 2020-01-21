import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

// fetchUser action creator - producers an action. The action is passed to the dispatch function. Redux thunk gives us direct action to the dispatch function
// With redux thunk we return a function!
/*export const fetchUser = () => {
  return function(dispatch) {
    axios.get('/api/current_user')
      .then(res => dispatch({
        type: FETCH_USER,
        payload: res
      }))
  }
}*/

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token)
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');
  dispatch({type: FETCH_USER, payload: res.data});
}

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');
  dispatch({type: FETCH_SURVEYS, payload: res.data})
}
