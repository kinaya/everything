import React, { Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import UserPreview from './UserPreview';
import { withRouter } from 'react-router-dom';

class Users extends Component {

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {

    const { users } = this.props

    return (
      <div className="users">
        <div className="container">
          <h3>Användare</h3>
            {users.map(user => { return (
              <UserPreview key={user._id} user={user} />
            )})}
        </div>
      </div>
    );
  }
}

function mapStateToProps({users}) {
  return { users }
}

export default connect(mapStateToProps, actions)(withRouter(Users));
