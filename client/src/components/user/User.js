import React, { Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ItemPreview from '../items/ItemPreview';

class User extends Component {

  componentDidMount() {
    this.props.fetchUserItems(this.props.user._id);
  }

  render() {

    const { userItems, deleteItem, user } = this.props

    return (
      <div>
        <h3>Setting</h3>
        Namn, Plats, Profilbild

        <h3>My items</h3>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
          {userItems.map(item => { return (
            <ItemPreview key={item._id} item={item} onDelete={(id, history) => deleteItem(id, history)} displayButtons={user._id === item._user ? true : false} />
          )})}
        </div>

      </div>
    );
  }
}

function mapStateToProps({userItems, user}) {
  return { userItems, user }
}

export default connect(mapStateToProps, actions)(User);
