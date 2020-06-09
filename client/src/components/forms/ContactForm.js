import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { TextArea } from './FormFields';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class ContactForm extends Component {

  onSubmit = (formValues) => {
    this.props.sendRequest(this.props.item, formValues, this.props.user, this.props.item._user)
  }

  render() {

    if(this.props.theForm && this.props.theForm.submitSucceeded) {
      return (
        <div className="container">
          <h5>Klart!</h5>
          <p>Din förfrågan har nu skickats till {this.props.name}</p>
        </div>
      )
    }

    return (
      <div className="container">
        <h5>Skicka förfrågan</h5>
        <p>Skicka en fråga till {this.props.name} om <span className="italic">{this.props.title}</span></p>

        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <label>Meddelande</label>
          <Field name="body" type="textarea" component={TextArea} />
          <button className="waves-effect waves-light btn-small" type="submit"><i className="material-icons right">mail</i>Skicka</button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  if(!values.body) {
    errors.body = "Du måste ange ett meddelande"
  }

  return errors;
}

const wrapped = reduxForm({
  validate,
  form: 'contactUserForm',
})(ContactForm);

function mapStateToProps(state) {
  return {
    theForm: state.form.contactUserForm,
    user: state.user,
    item: state.routeState.item
  }
}

export default connect(mapStateToProps, actions)(wrapped)
