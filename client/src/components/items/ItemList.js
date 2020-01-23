import React, { Component} from 'react';
import ItemPreview from './ItemPreview';
import { connect } from 'react-redux';
import  * as actions from '../../actions';

class ItemList extends Component {

  componentDidMount() {
    this.props.fetchItems();
  }

  render() {

    const { items, deleteItem, user } = this.props

    return (
      <div>
        <div>
          Sökfält och filtrering ska vara här!
          Samt möjlighet att ordna dem i den ordning man vill
        </div>

        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
          {items.map(item => { return (
            <ItemPreview key={item._id} item={item} onDelete={(id, history) => deleteItem(id, history)} displayButtons={user._id === item._user ? true : false} />
          )})}
        </div>
      </div>
    );
  }
}

function mapStateToProps({items, user}) {
  return { items, user }
}

export default connect(mapStateToProps, actions)(ItemList);
