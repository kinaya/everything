import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'


// This doesn't work since auth always flashes 'false' for a short period before it's loaded from backend
const PrivateRoute = ({component: Component, user, ...rest}) => (
  <Route {...rest} render={(props) => (
    !user
      ? <Redirect to={{pathname: '/user/login'}} />
      : <Component {...props} />
  )} />
)

function mapStateToProps({user}) {
  return {user}
}

export default connect(mapStateToProps)(PrivateRoute);
