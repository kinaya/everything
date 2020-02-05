import React from 'react'
import { withRouter } from 'react-router-dom';

const ItemPreview = ({item, displayButtons, onDelete, history}) => (

    <div
      onClick={() => history.push(`/item/${item._id}`)}
      className={`card item-preview type-${item.type}`}>

      <div className="card-image">
        {item._image && (
          <img alt="A thing" src={item._image.url} />
        )}
      </div>

      <div className="card-content">
        <h5>{item.title}</h5>

        <div className="meta-preview">
          <span>{item._user.name}, {new Date(item.datePosted).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short'})}</span>

          {item.distance !== false && (
            <span>{`${item.distance} km bort`}</span>
          )}
        </div>

      </div>
    </div>

)

export default withRouter(ItemPreview);
