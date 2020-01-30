import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ItemPreview from './ItemPreview';

class Featured extends Component {

  componentDidMount() {
    this.props.fetchFeatured()
  }

  render() {

    const { featured } = this.props;

    if(!featured) {
      return <div></div>
    }

    return (
      <div className="items featured">
        {featured.map(item => { return (
          <ItemPreview key={item._id} item={item} />
        )})}
      </div>
    )
  }

}

const mapStateToProps = ({featured}) => (
  {featured}
)

export default connect(mapStateToProps, actions)(Featured);
