import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = ({user}) => (

  <nav className="header">
    <div className="nav-wrapper">

      <Link to={user ? '/items' : '/'} className="logo left" >EveryThing</Link>

      {!user && (
        <ul id="nav" className="right">
          <li>
            <a href="/auth/google">Logga in med Google</a>
          </li>
        </ul>
      )}

      {user && (
        <ul id="nav" className="right">

          <li key="1">
            <Link to="/item/new" className="btn-floating btn-small waves-effect waves-light green darken-3">
              <i className="material-icons">add</i>
            </Link>
          </li>

          <li key="2">
            <Link to={`/user/${user._id}`}>
              Mitt konto
            </Link>
          </li>

        </ul>
      )}

     </div>
   </nav>

);

function mapStateToProps({user}) {
  return {user}
}

export default connect(mapStateToProps)(Header);
