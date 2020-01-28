import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Header';
import Footer from './Footer';
import Landing from './Landing';
import Item from './items/Item';
import User from './user/User';
import Login from './user/Login';
import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';
import ItemList from './items/ItemList';
import ItemEdit from './items/ItemEdit';
import ItemCreate from  './items/ItemCreate';
import Loading from './Loading';
import Users from './user/Users';
import UserSettings from './user/UserSettings';
import withOwnItemCheck from './withOwnItemCheck';


import '../sass/style.scss';

class App extends Component {

  componentDidMount() {
    this.props.fetchCurrentUser();
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

        <div className="content">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/user/login" component={Login} />
            <RestrictedRoute exact path="/users" component={Users} />
            <RestrictedRoute exact path="/user/:id" component={User} />
            <PrivateRoute exact path="/user/:id/settings" component={UserSettings} />
            <RestrictedRoute exact path="/items" component={ItemList} />
            <RestrictedRoute exact path="/item/new" component={ItemCreate} />
            <RestrictedRoute exact path="/item/:id" component={Item} />
            <Route exact path="/item/:id/edit" component={withOwnItemCheck(ItemEdit)} />
          </Switch>

          <ToastContainer />
        </div>

        <Footer />

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
