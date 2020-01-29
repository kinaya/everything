import axios from 'axios';
import {CLEAR_ROUTE_STATE, FETCH_USER, FETCH_ITEMS, FETCH_ITEM, UPDATE_LOADING, FETCH_USER_ITEMS, FETCH_PROFILE, FETCH_USERS } from './types';
import { toast } from 'react-toastify'
import randomize from 'randomatic'

import { SubmissionError } from 'redux-form'


/* == Images == */
export const createImage = (file) => async dispatch => {
  console.log('createImage')
  console.log(file)
  const fileName = encodeURIComponent(file.name)
  try {
    const random = randomize('a0', 10);
    // Create a random fileName
    const fileNameExtension = fileName.split('.').pop();
    const fileNameText = fileName.replace(/\.[^/.]+$/, "")
    const fileNameRandom = fileNameText + '-' + random + '.' + fileNameExtension;

    const res = await axios.get(`/api/image/new?fileName=${fileNameRandom}&fileType=${file.type}`)

    await axios.put(res.data.signedRequest, file)
    return res.data.image;

  } catch (err) {
    console.log(err)
  }
}

export const deleteImage = (imageId) => async dispatch => {
  console.log('deleteImage', imageId)
  try {
    const res = await axios.post(`/api/deleteImage`, {imageId})
    return res.status;
  } catch (err) {
    console.log(err)
  }
}


/* ====================== Users ====================== */
export const fetchUsers = () => async dispatch => {
  const res = await axios.get('/api/users')
  dispatch({type: FETCH_USERS, payload: res.data})
}

export const fetchCurrentUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data })
  dispatch({ type: UPDATE_LOADING, payload: false})
}

export const fetchProfile = (userId) => async dispatch => {
  const res = await axios.get(`/api/user/${userId}`)
  dispatch({type: FETCH_PROFILE, payload: res.data})
}

export const deleteUser = (userId, history) => async dispatch => {
  try {
    const res = await axios.delete(`/api/user/${userId}`);
    history.push('/');
    toast.success(`Användaren ${res.data.name} är nu borttagen`, {position: toast.POSITION.TOP_CENTER});
  } catch (err) {
    toast.error('Användaren kunde inte tas bort', {position: toast.POSITION.TOP_CENTER});
  }
}


/* ====================== Item ====================== */

export const createItem = (formValues, history) => async dispatch => {
  try {
    const res = await axios.post('/api/items', formValues);
    history.push(`/item/${res.data._id}`);
    toast.success(`${res.data.title} är nu uppladdad`,{position: toast.POSITION.TOP_CENTER});
  } catch (err) {
    if(err.response.data.name === 'BadRequestError') {
      const errorObject = {_error: 'Failed!'}
      err.response.data.errors.map(error => (
        errorObject[error.param] = error.msg
      ))
      throw new SubmissionError(errorObject)
    } else {
      toast.error(err.response.data, {position: toast.POSITION.TOP_CENTER})
    }
  }
}

export const fetchItems = () => async dispatch => {
  const res = await axios.get('/api/items');
  console.log('fetch item')
  dispatch({type: FETCH_ITEMS, payload: res.data})
  console.log('two')
}

export const fetchUserItems = (userId) => async dispatch => {
  const res = await axios.get(`/api/items/${userId}`)
  dispatch({type: FETCH_USER_ITEMS, payload: res.data})
}

export const fetchItem = (itemId) => async dispatch => {
  console.log('starting fetch item')


  try {
    const res = await axios.get(`/api/item/${itemId}`);
    dispatch({type: FETCH_ITEM, payload: res.data})
  } catch (e) {
    if (e.response && e.response.data) {
      toast.error(e.response.data.message, {position: toast.POSITION.TOP_CENTER})
    }
  }
}

export const editItem = (itemId, formValues, history) => async dispatch => {
  console.log('editItem:', formValues)

  const res = await axios.put(`/api/item/${itemId}`, formValues)
  history.push(`/item/${res.data._id}`);
  toast.success(`${res.data.title} är uppdaterad`,{position: toast.POSITION.TOP_CENTER});
}

export const deleteItem = (itemId, history) => async dispatch => {
  try {
    const res = await axios.delete(`/api/item/${itemId}`);
    history.push('/items');
    toast.success(`${res.data.title} är nu borttagen`,{position: toast.POSITION.TOP_CENTER});
  } catch (err) {
      console.log('err', err)
//    if (err.response && err.response.data) {
//      toast.error(err.response.data.message, {position: toast.POSITION.TOP_CENTER})
//    }
  }

}

/* ====================== Borrow ====================== */
export const sendBorrowRequest = (formValues) => async dispatch => {
  console.log('sendBorrowRequest with message:', formValues.body)
}


/* ====================== Temp data ====================== */

export const clearRouteState = () => async dispatch => {
  dispatch({type: CLEAR_ROUTE_STATE})
}
