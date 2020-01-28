import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { TextArea, DateTimePicker } from './ItemFormField';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class ItemBorrowForm extends Component {

  onSubmit = (formValues) => {
    this.props.sendBorrowRequest(formValues)
  }

  render() {

    if(this.props.theForm && this.props.theForm.submitSucceeded) {
      return (<div>Din förfrågan har skickats.</div>)
    }

    return (
      <div className="itemBorrowForm">
      <div className="container">
        <h4>Skicka låneförfrågan till {this.props.name}</h4>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>

            <Field name="date" component={DateTimePicker} />

            <label>Meddelande</label>
            <div>
              <Field name="body" type="textarea" component={TextArea} />
            </div>

          <button className="waves-effect waves-light btn-small" type="submit"><i className="material-icons right">mail</i>Skicka</button>
        </form>
      </div>
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
  form: 'itemBorrowForm',
  initialValues: {visibility: 'all'}
})(ItemBorrowForm);

function mapStateToProps(state) {
  return {theForm: state.form.itemBorrowForm}
}

export default connect(mapStateToProps, actions)(wrapped)
