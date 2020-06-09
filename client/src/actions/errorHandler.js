import history from '../history'
import { SubmissionError } from 'redux-form'
import { toast } from 'react-toastify'

const handleError = (e) => {

  // Not found
  if(e.response && e.response.status === 404) {
    history.push('/404')
  }

  // Validation error
  else if (e.response && e.response.data.name === 'BadRequestError') {
    const errorObject = {_error: 'Det finns fel i formuläret. Formuläret kunde inte skickas.'}
    e.response.data.errors.map(error => (
      errorObject[error.param] = error.msg
    ))
    throw new SubmissionError(errorObject)
  }

  // Toast errors with message
  else if(e.response && e.response.data.message) {
    toast.error(e.response.data.message, {position: toast.POSITION.TOP_CENTER})
  }

  // Log all errors
  console.log(e)

}

export default handleError;
