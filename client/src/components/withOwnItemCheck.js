import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Unauthorized from  './Unauthorized';
import Loading from './Loading';

export default function (ComposedComponent) {
  class privateRoute extends React.Component {

    componentDidMount() {
      this.props.fetchItem(this.props.match.params.id)
    }

    render() {

      const {user, item} = this.props

      if(!item) { return (
        <Loading />
      )}

      if(user && user._id === item._user._id) { return (
        <ComposedComponent {...this.props} />
      )}

      return <Unauthorized />

    }
  }

function mapStateToProps({user, item}) {
  return {user, item}
};

return connect(mapStateToProps, actions)(privateRoute);
}
