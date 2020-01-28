import React, { Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

class User extends Component {

  componentDidMount() {
    this.props.fetchProfile(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearProfile()
  }

  render() {

    const { user, profile, deleteUser, history } = this.props

    return (
      <div>
        <h3>User profile: {profile.name}</h3>
        <p>Current user: {user.name}</p>
        <img src={`${profile.image}`} alt="profile" />
        <button onClick={() => deleteUser(user._id, history)} >Delete User</button>
      </div>
    );
  }
}

function mapStateToProps({user, profile}) {
  return { user, profile }
}

export default connect(mapStateToProps, actions)(withRouter(User));
