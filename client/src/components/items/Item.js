import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../../actions'
import ContactForm from './../forms/ContactForm';
import Loading from '../Loading';
import Map from './Map';

class Item extends Component {

  componentDidMount() {
    this.props.fetchItem(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.clearRouteState()
  }

  displayDistance = (item) => {
    if(item.distance && item.distance !== false) { return (
      <p><i className="material-icons">my_location</i> ca {item.distance} km bort</p>
    )}
    return null
  }


  render() {

    const {item, user, deleteItem, history} = this.props;

    console.log(item)

    if(!item) return ( <Loading /> )

    return (
      <div className="item">
        <div className="container">

          <h2>{item.title}</h2>

          <div className="meta">
            <div className="image">
              <img className="image-small" alt={item._user.name} src={item._user.image} />
            </div>
            <div className="text">
              <Link to={`/user/${item._user._id}`}>{item._user.name}</Link>
              <span>{new Date(item.datePosted).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric'})}</span>
            </div>
          </div>

          {item._image && (
            <img className="image-large" src={item._image.url} alt={`Bild på ${item.title}`} />
          )}

          <div className="body">
            <p>{item.body}</p>
          </div>

          {item._user._id === user._id && (
            <div>
              <Link className="waves-effect waves-light btn-small" to={`/item/${item._id}/edit`}><i className="material-icons right">edit</i>Edit</Link>
              <button onClick={() => deleteItem(item._id, history)} className="deep-orange waves-effect waves-light btn-small"><i className="material-icons right">delete</i>Delete</button>
            </div>
          )}

        </div>


        <div className="itemStats">
          <div className="container">

            {item.coordinates &&
              <div className="stats-map">
                <Map item={item} />
              </div>
            }

            <div className="stats-stats">

              {item.type === 'lend' && (
                <p><i className="material-icons">access_time</i> Lånas ut</p>
              )}

              {item.type === 'giveaway' && (
                <p><i className="material-icons">access_time</i> Skänkes bort</p>
              )}

              {item.type === 'public' && (
                <p><i className="material-icons">access_time</i> Offentlig resurs</p>
              )}

              <p><i className="material-icons">date_range</i>{new Date(item.datePosted).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric'})}</p>

              <p><i className="material-icons">person</i><Link to={`/user/${item._user._id}`}>{item._user.name}</Link></p>

              {this.displayDistance(item)}

            </div>
          </div>
        </div>

        {item.type !== 'public' && (item._user._id !== user._id) && (
          <div className="contactUserForm">
            <ContactForm name={item._user.name} title={item.title} />
          </div>
        )}

      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {item: state.routeState.item, user: state.user}
}

export default connect(mapStateToProps, actions)(withRouter(Item));
