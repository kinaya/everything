import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import ItemForm from './ItemForm';

class ItemCreate extends Component {

  onSubmit = (formValues, history) => {
    return this.props.createItem(formValues, history)
  }

  render() {
    console.log('huh')
    return (
      <div className="itemCreate">
        <div className="container">
          <h2>Lägg till en sak</h2>
          <ItemForm initialValues={{visibility: true}} imageState={false} onSubmit={this.onSubmit} submitText="Lägg till" submitIcon="add" />
        </div>
      </div>
    )
  }
}

export default connect(null, actions)(ItemCreate);
