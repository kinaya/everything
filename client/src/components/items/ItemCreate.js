import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import ItemForm from './../forms/ItemForm';

class ItemCreate extends Component {

  onSubmit = (formValues, history) => {
    return this.props.createItem(formValues, history)
  }

  render() {
    return (
      <div className="itemCreate">
        <div className="container">
          <h2>Lägg till</h2>
          <ItemForm imageState={false} onSubmit={this.onSubmit} submitText="Lägg till" submitIcon="add" />
        </div>
      </div>
    )
  }
}

export default connect(null, actions)(ItemCreate);
