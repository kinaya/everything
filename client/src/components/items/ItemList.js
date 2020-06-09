import React, { Component} from 'react';
import ItemPreview from './ItemPreview';
import FilterForm from './../forms/FilterForm';
import { connect } from 'react-redux';
import  * as actions from '../../actions';
import { filterAndSortItems } from '../../utils/sortObjects';
import NoResults from './NoResults';
import Loading from './../Loading';

class ItemList extends Component {

  componentDidMount() {
    this.props.fetchItems();
  }

  displayResults = (items, form, sortByDistance) => {
    const filteredItems = filterAndSortItems(items, form, sortByDistance)

    if(filteredItems.length !== 0) {
      return (
        filteredItems.map(item => (
          <ItemPreview key={item._id} item={item} />
        ))
      )
    }

    return (
      <NoResults />
    )
  }


  render() {
    const { items, form, userCoordinates } = this.props

    if(!items) { return <Loading /> }

    let sortByDistance = false
    if(userCoordinates && userCoordinates.length > 0) {
      sortByDistance = true
    }

    return (
      <div className="container container-large">
        <FilterForm sortByDistance={sortByDistance} />
        <div className="items">
          {this.displayResults(items, form, sortByDistance)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({items, form, userCoordinates}) => (
  { items, form, userCoordinates }
)

export default connect(mapStateToProps, actions)(ItemList);
