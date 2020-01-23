import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import ItemForm from './ItemForm';

class ItemCreate extends Component {

  onSubmit = (formValues, history) => {
    this.props.createItem(formValues, history)
  }

  render() {
    return (
      <div>
        <h2>Lägg till en sak</h2>
        <ItemForm onSubmit={this.onSubmit} submitText="Lägg till" submitIcon="add" />
      </div>
    )
  }
}

export default connect(null, actions)(ItemCreate);
