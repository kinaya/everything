import React from 'react'

const Unauthorized = ()  => {
  return (
    <div className="unauthorized">
      <div className="container">

        <div className="intro">
          <h1 className="baloo">Logga in för att se alla saker</h1>
          <p>Snabbt och enkelt, och är självklart alldeles gratis</p>
          <a href="/auth/google" className="waves-effect waves-light btn orange darken-2">Logga in med Google</a>
        </div>

      </div>
    </div>
  )
}
export default Unauthorized;
