import history from '../history'
import { SubmissionError } from 'redux-form'
import { toast } from 'react-toastify'

const handleError = (e) => {

  console.log('handleError is run')
  console.log(e)

  // Not found
  if(e.response && e.response.status === 404) {
    history.push('/404')
  }

  // Validation error
  else if (e.response && e.response.data.name === 'BadRequestError') {
    const errorObject = {_error: 'Failed!'}
    e.response.data.errors.map(error => (
      errorObject[error.param] = error.msg
    ))
    throw new SubmissionError(errorObject)
  }

  // Toast all other errors
  else {
    //toast.error(e.response.data.message, {position: toast.POSITION.TOP_CENTER})
  }

}

export default handleError;
