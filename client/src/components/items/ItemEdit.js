import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import ItemForm from './../forms/ItemForm';
import Loading from '../Loading';

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

    const initialValues = {...item};
    if(item._image) {
      initialValues._image = item._image._id;
    }

    if(!item) {
      return <Loading />
    }

    return (
      <div className="itemEdit">
        <div className="container">
          <h2>Edit <span className="italic">{item.title}</span></h2>
          <ItemForm onSubmit={this.onSubmit} submitText="Uppdatera" imageState={item._image} initialValues={initialValues} submitIcon="edit" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {item: state.routeState.item }
}

export default connect(mapStateToProps, actions)(ItemEdit);
