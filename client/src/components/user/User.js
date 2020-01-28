import React, { Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ItemPreview from '../items/ItemPreview';
import { withRouter } from 'react-router-dom';
import Loading from '../Loading'

class User extends Component {

  componentDidMount() {
    this.props.fetchProfile(this.props.match.params.id);
    this.props.fetchUserItems(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearRouteState()
  }

  render() {

    const { userItems, deleteItem, user, profile } = this.props

    if(!profile || !userItems) { return (
      <Loading />
    )}

    return (
      <div className="user">
        <div className="container">

          <h3>{profile.name}</h3>

          {user._id === profile._id &&
            <a href="/api/logout">Logout</a>
          }

          <p>{profile.email}</p>

          <img className="avatar" src={`${profile.image}`} alt="profile" />

        </div>

        <div className="userItems">
          <div className="container">
            <h4>{profile.name}s saker</h4>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
              {userItems.filter(item => item._user._id === user._id || item.visibility).map(item => { return (
                <ItemPreview key={item._id} item={item} onDelete={(id, history) => deleteItem(id, history)} displayButtons={user._id === item._user._id ? true : false} />
              )})}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {userItems: state.routeState.userItems, user: state.user, profile: state.routeState.profile}
}

export default connect(mapStateToProps, actions)(withRouter(User));
