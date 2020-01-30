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

  // To force reload if on another users profile and clicks "My account"
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchProfile(this.props.match.params.id);
      this.props.fetchUserItems(this.props.match.params.id);
    }
  }


  render() {

    const { userItems, user, profile } = this.props

    if(!profile || !userItems) { return (
      <Loading />
    )}

    return (
      <div className="user">
        <div className="container">

          <div className="user-info">
            <img className="image-medium" src={`${profile.image}`} alt={profile.name} />

            <h4>{profile.name}</h4>

            <p>{profile.email}</p>

            {user._id === profile._id &&
              <a href="/api/logout">Logout</a>
            }

          </div>

        </div>

        <div className="userItems">
          <div className="container container-large">

            <h5>{user._id === profile._id ? 'Mina' : profile.name + 's'} saker</h5>

            <div className="items">
              {userItems.filter(item => item._user._id === user._id || item.visibility).map(item => { return (
                <ItemPreview key={item._id} item={item} />
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
