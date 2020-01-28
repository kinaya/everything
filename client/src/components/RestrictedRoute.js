import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import Unauthorized from './Unauthorized'

const RestrictedRoute = ({component: Component, user, ...rest}) => (
  <Route {...rest} render={(props) => (
    !user
      ? <Unauthorized />
      : <Component {...props} />
  )} />
)

function mapStateToProps({user}) {
  return {user}
}

export default connect(mapStateToProps)(RestrictedRoute);
