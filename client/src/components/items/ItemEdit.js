import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import ItemForm from './ItemForm';

class ItemEdit extends Component {

  componentDidMount() {
    return this.props.fetchItem(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.clearItem()
  }

  onSubmit = (formValues, history) => {
    this.props.editItem(this.props.match.params.id, formValues, history)
  }

  render() {

    const { item } = this.props;

    if(!item) {
      return <div>Loading...</div>
    }

    return (
      <div className="itemEdit">
        <div className="container">
          <h2>Edit <span style={{fontStyle: 'italic'}}>{item.title}</span></h2>
          <ItemForm onSubmit={this.onSubmit} initialValues={{title: item.title, body: item.body, visibility: item.visibility}} submitText="Uppdatera" submitIcon="edit" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({item}) => {
  return {item} // Jag måste kanske ta bort vurrent item när komponent stänges annars kommer det flasha här??
}

export default connect(mapStateToProps, actions)(ItemEdit);
