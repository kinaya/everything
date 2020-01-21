import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {

  // This works instead of constructor.. bc create ract app
  state = { showFormReview: false }

  renderContent() {
    if(this.state.showFormReview) {
      return <SurveyFormReview onCancel={() => this.setState({showFormReview: false})} />
    }
    return <SurveyForm onSurveySubmit={() => this.setState({showFormReview: true})} />
  }

  render() {
    return(
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

// used to clear values in form when component unmounts
// we dont stop destory form in this component
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
