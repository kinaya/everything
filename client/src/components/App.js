import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Item from './items/Item';
import User from './user/User';
import Login from './user/Login';
import PrivateRoute from './PrivateRoute';
import ItemList from './items/ItemList';
import ItemEdit from './items/ItemEdit';
import ItemCreate from  './items/ItemCreate';
import Loading from './Loading';

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {

    if(this.props.loading) {
      return (
        <Loading />
      )
    }

    return (
      <BrowserRouter>

        <Header />

        <div className="container">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/user/login" component={Login} />
            <PrivateRoute exact path="/user" component={User} />
            <PrivateRoute exact path="/items" component={ItemList} />
            <PrivateRoute exact path="/item/new" component={ItemCreate} />
            <PrivateRoute exact path="/item/:itemId" component={Item} />
            <PrivateRoute exact path="/item/:itemId/edit" component={ItemEdit} />
          </Switch>
        </div>

      </BrowserRouter>
    );

  }
};

function mapStateToProps(state) {
  return { loading: state.loading };
}

export default connect(mapStateToProps, actions)(App);


/*<PrivateRoute exact path="/item/:itemId/edit" component={ItemNew} />
<PrivateRoute exact path="/user" component={User} />
<PrivateRoute exact path="/items" component={Items} />
<Route exact path="/streams/new" component={StreamCreate} />*/
