import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import ItemForm from './ItemForm';

class ItemEdit extends Component {

  componentDidMount() {
    this.props.fetchItem(this.props.match.params.itemId)
  }

  onSubmit = (formValues, history) => {
    this.props.editItem(this.props.match.params.itemId, formValues, history)
  }

  render() {

    const { item } = this.props;

    if(!item) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h2>Edit <span style={{fontStyle: 'italic'}}>{item.title}</span></h2>
        <ItemForm onSubmit={this.onSubmit} initialValues={{title: item.title, body: item.body}} submitText="Uppdatera" submitIcon="edit" />
      </div>
    )
  }
}

const mapStateToProps = ({item}) => {
  return {item} // Jag måste kanske ta bort vurrent item när komponent stänges annars kommer det flasha här??
}

export default connect(mapStateToProps, actions)(ItemEdit);
