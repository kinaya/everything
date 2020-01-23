import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';

const ItemPreview = ({item, displayButtons, onDelete, history}) => {

  // Todo: When editing the user gets redirected to /items even if they clicked edit from the /user page!
  // Todo: Make whole card clickable!

  return (
    <div className="card" style={{flexBasis: '32%'}}>

      <div className="card-image">
        <img alt="A thing" src="autumn.jpg" />
        <span className="card-title" style={{padding: '0.5em'}}>{item.title}</span>
      </div>

      <div className="card-content" style={{padding: '0.8em'}}>
        <p>{item.body}</p>
        <p><Link to={`/item/${item._id}`} >Se hela</Link></p>

        {displayButtons && (
          <div className="card-action" style={{padding: '1em 0 0 0'}}>
            <Link className="waves-effect waves-light btn-small" to={`/item/${item._id}/edit`}><i className="material-icons right">edit</i>Edit</Link>
            <button style={{marginLeft: '1em'}} onClick={() => onDelete(item._id, history)} className="deep-orange waves-effect waves-light btn-small"><i className="material-icons right">delete</i>Delete</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default withRouter(ItemPreview);
