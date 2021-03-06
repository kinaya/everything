import React from 'react';
import Featured from './items/Featured'
import { connect } from 'react-redux'

const Landing = ({user}) => (
  <div className="landing">
    <div className="container container-large">

      <div className="intro">

        <h1 className="baloo">Tillsammans har vi allt</h1>

        <p>Låna det du behöver, och låna ut sånt du själv inte använder så ofta.
        Bra för dig, miljön och världen ♥</p>

        {!user && (
          <a href="/auth/google" className="waves-effect waves-light btn orange darken-2">Logga in med Google</a>
        )}

      </div>

      <div className="featured">
        <Featured />
      </div>

    </div>
  </div>
)

const mapStateToProps = (user) => (
  {user}
)
export default connect(mapStateToProps)(Landing);
