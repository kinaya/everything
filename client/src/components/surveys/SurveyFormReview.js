import _ from 'lodash';
import React from 'react'
import { connect } from 'react-redux';
import formFields from './formFields';

const SurveyFormReviews = ({onCancel, formValues}) => {

  const reviewFields = _.map(formFields, field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>
          {formValues[field.name]}
        </div>
      </div>
    );
  })

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  }
}

export default connect(mapStateToProps)(SurveyFormReviews);
