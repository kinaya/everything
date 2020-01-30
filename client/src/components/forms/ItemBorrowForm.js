import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { TextArea } from './ItemFormField';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class ItemBorrowForm extends Component {

  onSubmit = (formValues) => {
    this.props.sendBorrowRequest(formValues)
  }

  render() {

    if(this.props.theForm && this.props.theForm.submitSucceeded) {
      return (
        <div className="itemBorrowForm">
          <div className="container">

            <h5>Klart!</h5>
            <p>Din förfrågan har nu skickats till {this.props.name}</p>

          </div>
        </div>
      )
    }

    return (
      <div className="itemBorrowForm">
        <div className="container">

          <h5>Skicka låneförfrågan</h5>
          <p>Fråga {this.props.name} om du kan låna <span style={{fontStyle: 'italic'}}>{this.props.title}</span></p>

          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>

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
