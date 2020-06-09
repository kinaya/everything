import axios from 'axios';
import {UPDATE_POSITION, TEMP_IMAGE, CLEAR_ROUTE_STATE, FETCH_FEATURED_ITEMS, FETCH_USER, FETCH_ITEMS, FETCH_ITEM, UPDATE_LOADING, FETCH_USER_ITEMS, FETCH_PROFILE, FETCH_USERS } from './types';
import { toast } from 'react-toastify'
import randomize from 'randomatic'
import { addDistance } from '../utils/addDistance';
import history from '../history'
import handleError from './errorHandler'


/* ====================== Image ====================== */

// Create an image
export const createImage = (file) => async dispatch => {

  // Create a random unique filename
  const fileName = encodeURIComponent(file.name)
  const random = randomize('a0', 10);
  const fileNameExtension = fileName.split('.').pop();
  const fileNameText = fileName.replace(/\.[^/.]+$/, "")
  const fileNameRandom = fileNameText + '-' + random + '.' + fileNameExtension;

  try {
    // Get a signed request from server
    const res = await axios.post('/api/image/new', {fileName: fileNameRandom, fileType: file.type})
    console.log(res)
    // Upload image to AWS S3
    await axios.put(res.data.signedRequest, file)
    // Return the image data
    dispatch({type: TEMP_IMAGE, payload: res.data.image})
    return res.data.image;
  } catch (e) {
    console.log('error', e)
    handleError(e)
  }
}

// Delete an image
export const deleteImage = (id) => async dispatch => {
  try {
    const res = await axios.delete(`/api/image/${id}`)
    // Check status...?
    dispatch({type: TEMP_IMAGE, payload: false})
  } catch (e) { handleError(e) }
}

/* ====================== Users ====================== */

// Fetch all users
export const fetchUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users')
    dispatch({type: FETCH_USERS, payload: res.data})
  } catch (e) { handleError(e) }
}

// Fetch the current user
export const fetchCurrentUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/current_user')
    dispatch({ type: FETCH_USER, payload: res.data })
    dispatch({ type: UPDATE_LOADING, payload: false})
  } catch (e) { handleError(e) }
}

// Fetch a profile
export const fetchProfile = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/user/${id}`)
    dispatch({type: FETCH_PROFILE, payload: res.data})
  } catch (e) { handleError(e) }
}

// Delete user
export const deleteUser = (id) => async dispatch => {
  try {
    const res = await axios.delete(`/api/user/${id}`);
    history.push('/');
    toast.success(`Användaren ${res.data.name} är nu borttagen`, {position: toast.POSITION.TOP_CENTER});
  } catch (e) { handleError(e) }
}

/* ====================== Items ====================== */


// Fetch featured items
export const fetchFeatured = () => async (dispatch, getState) => {
  try {
    const res = await axios.get('/api/items/featured');
    let items = res.data;
    if(getState().userCoordinates) {
      items = addDistance(res.data, getState().userCoordinates)
    }
    dispatch({type: FETCH_FEATURED_ITEMS, payload: items})
  } catch (e) { handleError (e) }
}

// Fetch all items
export const fetchItems = () => async (dispatch, getState) => {
  try {
    const res = await axios.get('/api/items');
    let items = res.data;
    if(getState().userCoordinates) {
      items = addDistance(items, getState().userCoordinates)
    }
    dispatch({type: FETCH_ITEMS, payload: items})
  } catch (e) { handleError(e) }
}

// Fetch a users items
export const fetchUserItems = id => async (dispatch, getState) => {
  try {
    const res = await axios.get(`/api/items/${id}`)
    let items = res.data;
    if(getState().userCoordinates) {
      items = addDistance(items, getState().userCoordinates)
    }
    dispatch({type: FETCH_USER_ITEMS, payload: items})
  } catch (e) { handleError(e) }
}

// Fetch a specific item
export const fetchItem = id => async (dispatch, getState) => {
  try {
    const res = await axios.get(`/api/item/${id}`);
    let item = res.data;
    if(getState().userCoordinates) {
      item = addDistance(item, getState().userCoordinates)
    }
    dispatch({type: FETCH_ITEM, payload: item})
  } catch (e) { handleError(e) }
}

// Create an item
export const createItem = (formValues, history) => async dispatch => {
  console.log('createItem')
  if(formValues._image === false) {
    delete formValues._image
  }
  if(formValues.coordinates === false) {
    delete formValues.coordinates
  }
  if(formValues.file) {
    delete formValues.file
  }


  try {
    const res = await axios.post('/api/items', formValues);
    history.push(`/item/${res.data._id}`);
    toast.success(`${res.data.title} är nu uppladdad`,{position: toast.POSITION.TOP_CENTER});
  } catch (e) { handleError(e) }
}

// Edit an item
export const editItem = (itemId, formValues, history) => async dispatch => {
  console.log('editItem formValues', formValues)
  if(formValues._image === false) {
    delete formValues._image
  }
  if(formValues.coordinates === false) {
    delete formValues.coordinates
  }
  console.log('editItem formValues that will be sent', formValues)
  try {
    const res = await axios.put(`/api/item/${itemId}`, formValues)
    history.push(`/item/${res.data._id}`);
    toast.success(`${res.data.title} är uppdaterad`,{position: toast.POSITION.TOP_CENTER});
  } catch (e) { handleError(e) }
}

// Delete an item
export const deleteItem = (itemId, history) => async dispatch => {
  try {
    const res = await axios.delete(`/api/item/${itemId}`);
    history.push('/items');
    toast.success(`${res.data.title} är nu borttagen`,{position: toast.POSITION.TOP_CENTER});
  } catch (e) { handleError(e) }
}

/* ====================== Requests ====================== */

// Send a request
export const sendRequest = (item, formValues, from, to) => async dispatch => {

  const message = {
    item,
    body: formValues.body,
    from,
    to
  }

  try {
    const res = await axios.post('/api/message', message);
    // Dispatch something here!
  } catch (e) { handleError(e)}
}

/* ====================== Route state ====================== */

// Clear route state
export const clearRouteState = () => async dispatch => {
  dispatch({type: CLEAR_ROUTE_STATE})
}

/* ====================== Geolocation ====================== */

// Get users location
export const getLocation = () => dispatch => {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = [position.coords.latitude, position.coords.longitude]
      dispatch({type: UPDATE_POSITION, payload: coords})
    });
  }
}
