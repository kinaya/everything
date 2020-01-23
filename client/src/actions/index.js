import axios from 'axios';
import { FETCH_USER, FETCH_ITEMS, FETCH_ITEM, UPDATE_LOADING, FETCH_USER_ITEMS } from './types';

// Fetch the current user
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data })
  dispatch({ type: UPDATE_LOADING, payload: false})
}

// Create an item
export const createItem = (formValues, history) => async dispatch => {
  const res = await axios.post('/api/items', formValues);
  dispatch({type: FETCH_ITEMS, payload: res.data}) // CREATE_ITEM??
  history.push('/items');
}

// Fetch a list of all items
export const fetchItems = () => async dispatch => {
  const res = await axios.get('/api/items');
  dispatch({type: FETCH_ITEMS, payload: res.data})
}

// Fetch a list of a users items
export const fetchUserItems = (userId) => async dispatch => {
  const res = await axios.get(`/api/items/${userId}`)
  dispatch({type: FETCH_USER_ITEMS, payload: res.data})
}

// Fetch a single item
export const fetchItem = (itemId) => async dispatch => {
  const res = await axios.get(`/api/item/${itemId}`);
  dispatch({type: FETCH_ITEM, payload: res.data})
}

// Edit an item
export const editItem = (itemId, formValues, history) => async dispatch => {
  const res = await axios.put(`/api/item/${itemId}`, formValues)
  dispatch({type: FETCH_ITEMS, payload: res.data})
  history.push('/items');
}

// Delete an item
export const deleteItem = (itemId, history) => async dispatch => {
  const res = await axios.delete(`/api/item/${itemId}`);
  dispatch({type: FETCH_ITEMS, payload: res.data})
  history.push('/items');
}
