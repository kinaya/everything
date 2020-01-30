import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import ItemForm from './../forms/ItemForm';

class ItemEdit extends Component {

  componentDidMount() {
    this.props.fetchItem(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.clearRouteState()
  }

  onSubmit = (formValues, history) => {
    this.props.editItem(this.props.match.params.id, formValues, history)
  }

  render() {

    const { item } = this.props;

    const initialValues = {
      imageId: item._image ? item._image._id : false,
      title: item.title,
      body: item.body,
      visibility: item.visibility
    }


    if(!item) {
      return <div>Loading...</div>
    }

    return (
      <div className="itemEdit">
        <div className="container">
          <h2>Edit <span style={{fontStyle: 'italic'}}>{item.title}</span></h2>
          <ItemForm onSubmit={this.onSubmit} submitText="Uppdatera" imageState={item._image} initialValues={initialValues} submitIcon="edit" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {item: state.routeState.item } // Jag måste kanske ta bort vurrent item när komponent stänges annars kommer det flasha här??
}

export default connect(mapStateToProps, actions)(ItemEdit);
