import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import Unauthorized from './Unauthorized'


/*const PrivateRoute = ({component: Component, user, ...rest}) => (
  <Route {...rest} render={(props) => (
    user && user._id === props.match.params.userId
      ? <Component {...props} />
      : <Unauthorized />
  )} />
)*/

// Jag kan inte jämföra användarId med itemId! Jag måste hämta item och _user._id på det...

function PrivateRoute({component: Component, user, ...rest}) {
  return (
    <Route {...rest} render={
      function(props){
        return (
        user && user._id === props.match.params.id
          ? <Component {...props} />
          : <Unauthorized />
        )
      }
    } />
  )
}

function mapStateToProps({user}) {
  return {user}
}

export default connect(mapStateToProps)(PrivateRoute);
