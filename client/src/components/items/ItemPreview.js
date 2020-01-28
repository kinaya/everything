import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';

const ItemPreview = ({item, displayButtons, onDelete, history}) => {

  return (
    <div onClick={() => history.push(`/item/${item._id}`)} className="card" style={{flexBasis: '32%', cursor: 'pointer'}}>

      <div className="card-image">
        <img alt="A thing" src={item.image ? item.image : '/autumn.jpg'} />
        <span className="card-title" style={{padding: '0.5em'}}>{item.title}</span>
      </div>

      <div className="card-content" style={{padding: '0.8em'}}>
        {!item.visibility && (
          <div>Denna sak visas inte för tillfället</div>
        )}
        {item._user.name} | {new Date(item.datePosted).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric'})}
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