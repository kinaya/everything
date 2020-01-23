import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {

  renderMenu() {
    switch(this.props.user) {
      case false:
        return (
          <li><a href="/auth/google">Login with Google</a></li>
        );
      default:
        return [
          <li key="1">{this.props.user._id}</li>,
          <li><Link key="4" to="/item/new">Lägg till</Link></li>,
          <li key="2"><Link to={'/user'}>Mitt konto</Link></li>,
          <li key="3"><a href="/api/logout">Logout</a></li>
        ];
    }
  }


  render() {
    return (
      <nav>
         <div className="nav-wrapper">
           <Link to={this.props.user ? '/items' : '/'} className="brand-logo left" >EveryThing</Link>
           <ul id="nav" className="right hide-on-med-and-down">
              {this.renderMenu()}
           </ul>
         </div>
       </nav>
    );
  }
}

// Hans desctructoring of auth doesn't work!
function mapStateToProps(state) {
  return {user: state.user}
}

export default connect(mapStateToProps)(Header);
