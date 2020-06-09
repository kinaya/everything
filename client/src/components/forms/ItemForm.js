import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { TextField, TextArea, Switch, RadioButton } from './FormFields';
import FormImage from './FormImage';
import FormMap from './FormMap';
import { connect } from 'react-redux'
import * as actions from  '../../actions'

class ItemForm extends Component {

  onSubmit = (formValues) => {
    return this.props.onSubmit(formValues, this.props.history)
  }

  deleteImage = () => {
    this.props.deleteImage(this.props.tempImage._id);
    this.props.change('_image', '')
    this.props.change('file', '') // Doesn't work!
  }

  render() {

    return (
      <form className="itemCreateForm" onSubmit={this.props.handleSubmit(this.onSubmit)} encType="multipart/form-data">

          <Field label="Rubrik" type="text" name="title" component={TextField} />

          <div className="type formField">
            <h6>Vad för typ av resurs är det?</h6>
            <p><label><Field name="type" component={RadioButton} type="radio" value="lend"/><span>Något jag vill låna ut</span></label></p>
            <p><label><Field name="type" component={RadioButton} type="radio" value="giveaway"/><span>Något jag vill skänka bort</span></label></p>
            <p><label><Field name="type" component={RadioButton} type="radio" value="public" /><span>En offentlig resurs jag vill tipsa om</span></label></p>
          </div>

          <div className="image formField">
            <Field name="_image" id="_image_hidden" component="input" />
            <Field name="file" type="file" deleteImage={this.deleteImage} tempImage={this.props.tempImage} component={FormImage} />
          </div>

          <Field label="Plats" name="coordinates" component={FormMap} />

          <Field label="Beskrivning" name="body" type="textarea" component={TextArea} />

          <Field label="Visa för andra" name="visibility" component={Switch} />

          {this.props.error && (
            <div className="card red darken-1">
              <div className="card-content white-text">
                <p>{this.props.error}</p>
              </div>
            </div>
          )}

        <button className="waves-effect waves-light btn-small" type="submit"><i className="material-icons right">{this.props.submitIcon}</i>{this.props.submitText}</button>
        <Link style={{marginLeft: '1em'}} to="/items" className="deep-orange waves-effect waves-light btn-small"><i className="material-icons right">cancel</i>Avbryt</Link>
      </form>
    )
  }
}

/*
* Validate fields on submit
*/
function validate(values) {
  const errors = {};

  if(!values.title) {
    errors.title = "Du måste ange en rubrik"
  }

  if(!values.body) {
    errors.body = "Du måste ange en beskrivning"
  }

  return errors;
}

/*
* Async validate image field
*/
const asyncValidate = async (values, dispatch, props) => {

  // Should this be done with promises?
  // See: https://gist.github.com/sbalay/da6b33ab1cce49190f74d9ddd7a4c468

  try {
    const image = await dispatch(actions.createImage(values.file));
    dispatch(props.change('_image', image._id))
  } catch(e) {
    console.log(e)
    throw {file: 'File not supported'}
  }

}

const mapStateToProps = ({tempImage}) => (
  {tempImage}
)

const decoratedComponent = connect(mapStateToProps, actions)(ItemForm)

export default reduxForm({
  form: 'itemForm',
  validate,
  asyncValidate,
  asyncChangeFields: ['file'],
  shouldAsyncValidate: (params) => {
    return params.trigger === 'change' && params.syncValidationPasses; // do not async validate on submit
  },
  initialValues: {visibility: true, type: 'lend'}
})(withRouter(decoratedComponent))
