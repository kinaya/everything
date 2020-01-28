import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';

const UserPreview = ({user}) => {

  return (
    <div class="card horizontal">
      <div class="card-image">
        <img src={`${user.image}`} alt="profile" />
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <h4>{user.name}</h4>
          <p>{user.email}</p>
          <p><Link to={`/user/${user._id}`} >Till användaren</Link></p>
        </div>
      </div>
    </div>
  )
}

export default withRouter(UserPreview);
