import React from 'react'

const Login = () => (
  <div className="login">
    <div className="container">
      <h1>Logga in för att se alla saker</h1>
      <p>Det är enkelt att logga in</p>
      <a href="/auth/google" className="waves-effect waves-light btn orange darken-2">Logga in med Google</a>
    </div>
  </div>
)

export default Login
