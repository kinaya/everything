import React, { Component} from 'react';
import ItemPreview from './ItemPreview';
import ItemFilterForm from './ItemFilterForm';
import { connect } from 'react-redux';
import  * as actions from '../../actions';
import sortObjects from '../../utils/sortObjects';
import NoResults from './NoResults';
import Loading from './../Loading';

class ItemList extends Component {

  componentDidMount() {
    this.props.fetchItems();
  }

  displayResults(items, filter) {

    if(!items) {
      return <Loading />
    }

    let filteredItems;

    // Search
    let searchQuery = '';
    if(filter && filter.search) {
      searchQuery = filter.search.toLowerCase()
    }

    filteredItems = items.filter(item => { return (
      item.visibility &&
      (
        item.title.toLowerCase().includes(searchQuery)
        || item.body.toLowerCase().includes(searchQuery)
      )
    )})

    // Order
    let key = "body"
    let order = "desc"
    if(filter && filter.order) {
      const vars = filter.order.split('_');
      key = vars[0]
      order = vars[1]
    }

    if(filteredItems.length !== 0) { return (
      filteredItems.sort(sortObjects(key, order)).map(item => { return (
        <ItemPreview key={item._id} item={item} onDelete={(id, history) => this.props.deleteItem(id, history)} displayButtons={this.props.user._id === item._user ? true : false} />
      )})
    )}

    return (
      <NoResults />
    )
  }

  render() {

    const { items, form } = this.props

    let filter = false
    if(form.itemFilterForm && form.itemFilterForm.values) {
      filter = form.itemFilterForm.values
    }

    return (
      <div className="items">
        <div className="container">

        <ItemFilterForm />

        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
          {this.displayResults(items, filter)}
        </div>

        </div>
      </div>
    );
  }
}

function mapStateToProps({items, user, form}) {
  return { items, user, form }
}

export default connect(mapStateToProps, actions)(ItemList);


/*          {items.map(item => { return (
            <ItemPreview key={item._id} item={item} onDelete={(id, history) => deleteItem(id, history)} displayButtons={user._id === item._user ? true : false} />
          )})}
*/