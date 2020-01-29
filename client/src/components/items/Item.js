import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../../actions'
import ItemBorrowForm from './ItemBorrowForm';
import Loading from '../Loading';

class Item extends Component {

  componentDidMount() {
    this.props.fetchItem(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.clearRouteState()
  }

  render() {

    const {item, user, deleteItem, history} = this.props;

    if(!item) return ( <Loading /> )

    return (
      <div className="item">
        <div className="container">

          <h2>{item.title}</h2>

          <div className="visibility">
            {!item.visibility && (
              <div>Denna sak visas inte för tillfället</div>
            )}
          </div>

          <div className="meta">
            <Link to={`/user/${item._user._id}`}>{item._user.name}</Link>
            <span>{new Date(item.datePosted).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric'})}</span>
          </div>

          {item._image && (
            <img className="image-large" src={item._image.url} alt="fkfnf" />
          )}

          <div className="body">
            <p>{item.body}</p>
          </div>

          {item._user._id === user._id && (
            <div>
              <Link className="waves-effect waves-light btn-small" to={`/item/${item._id}/edit`}><i className="material-icons right">edit</i>Edit</Link>
              <button style={{marginLeft: '1em'}} onClick={() => deleteItem(item._id, history)} className="deep-orange waves-effect waves-light btn-small"><i className="material-icons right">delete</i>Delete</button>
            </div>
          )}

        </div>

        <ItemBorrowForm name={item._user.name} />

      </div>
    )
  }
};

function mapStateToProps(state) {
  return {item: state.routeState.item, user: state.user}
}

/*function mapStateToProps({item, user}) {
  return {item, user};
}*/

export default connect(mapStateToProps, actions)(withRouter(Item));
