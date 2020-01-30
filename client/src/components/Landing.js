import React from 'react';
import Featured from './items/Featured'

const Landing = () => (
  <div className="landing">
    <div className="container">

      <div className="intro">

        <h1 className="baloo">Tillsammans har vi allt</h1>

        <p>Låna det du behöver, och låna ut sånt du själv inte använder så ofta.
        Bra för dig, miljön och världen ♥</p>

        <a href="/auth/google" className="waves-effect waves-light btn orange darken-2">Logga in med Google</a>

      </div>

      <div className="featured">
        <Featured />
      </div>

    </div>
  </div>
)

export default Landing;
