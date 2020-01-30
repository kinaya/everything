import React from 'react';
import {Field, reduxForm} from 'redux-form';
import { TextField } from './ItemFormField';

const ItemFilterForm = () => (

  <form className="itemFilterForm">
    <div className="row">
      <div className="col m8">
        <Field key="search" placeholder="Sök" type="text" name="search" component={TextField} />
      </div>

      <div className="col m4">
        <Field name="order" component="select" className="browser-default">
          <option value="datePosted_desc">Nyaste överst</option>
          <option value="datePosted_asc">Äldsta överst</option>
          <option value="title_asc">Titel</option>
        </Field>
      </div>

    </div>
  </form>

)

export default reduxForm({
  form: 'itemFilterForm',
  defaultValues: {order: 'datePosted_desc'}
})(ItemFilterForm);
