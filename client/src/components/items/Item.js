import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../../actions'

class Item extends Component {

  componentDidMount() {
    this.props.fetchItem(this.props.match.params.itemId)
  }

  render() {

    const {item, user, deleteItem, history} = this.props;

    return (
      <div>
        <h2>{item.title}</h2>
        <p>{item.body}</p>

        {item._user === user._id && (
          <div className="card-action">
            <Link to={`/item/${item._id}/edit`}>Edit</Link>
            <button onClick={() => deleteItem(item._id, history)} >Delete</button>
          </div>
        )}

      </div>
    )
  }
};

function mapStateToProps({item, user}) {
  return {item, user};
}

export default connect(mapStateToProps, actions)(withRouter(Item));
