import React, { Component} from 'react';
import ItemPreview from './ItemPreview';
import ItemFilterForm from './../forms/ItemFilterForm';
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

    // SearchFilter
    let searchQuery = '';
    if(filter && filter.search) {
      searchQuery = filter.search.toLowerCase()
    }

    // TypeFilter
    let typeArray = ['lend', 'giveaway', 'public']
    if(filter) {
      typeArray = []
      filter.display_lend && typeArray.push('lend')
      filter.display_giveaway && typeArray.push('giveaway')
      filter.display_public && typeArray.push('public')
    }

    // Order
    let key = "body"
    let order = "desc"
    if(filter && filter.order) {
      const vars = filter.order.split('_');
      key = vars[0]
      order = vars[1]
    }

    // Filter the items
    const filteredItems = items.filter(item => (
      item.visibility &&
      typeArray.includes(item.type) &&
      (
        item.title.toLowerCase().includes(searchQuery) ||
        item.body.toLowerCase().includes(searchQuery) ||
        item._user.name.toLowerCase().includes(searchQuery)
      )
    ))

    if(filteredItems.length !== 0) { return (
      filteredItems.sort(sortObjects(key, order)).map(item => { return (
        <ItemPreview key={item._id} item={item} />
      )})
    )}

    return (
      <NoResults />
    )
  }

  render() {

    const { items, form } = this.props

    if(!items) {
      return <Loading />
    }

    let filter = false
    if(form.itemFilterForm && form.itemFilterForm.values) {
      filter = form.itemFilterForm.values
    }

    return (
      <div className="container container-large">

        <ItemFilterForm />

        <div className="items">
          {this.displayResults(items, filter)}
        </div>

      </div>
    );
  }
}

const mapStateToProps = ({items, user, form}) => (
  { items, user, form }
)

export default connect(mapStateToProps, actions)(ItemList);
