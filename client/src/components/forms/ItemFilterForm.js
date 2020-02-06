import React from 'react';
import {Field, reduxForm} from 'redux-form';
import { TextField, Checkbox } from './ItemFormField';

const ItemFilterForm = ({sortByDistance}) => (

  <form className="itemFilterForm">

    <div className="search">
      <Field key="search" placeholder="Sök" type="text" name="search" component={TextField} />
    </div>

    <div className="filter">
      <Field className="order browser-default" name="order" component="select">

        {sortByDistance && (
          <option value="distance_asc">Närmast överst</option>
        )}

        <option value="datePosted_desc">Nyaste överst</option>
        <option value="datePosted_asc">Äldsta överst</option>
        <option value="title_asc">Titel A-Ö</option>
      </Field>

      <div className="display">
        <Field name="display_lend" label="Utlånas" component={Checkbox} />
        <Field name="display_giveaway" label="Bortskänkes" component={Checkbox} />
        <Field name="display_public" label="Offentliga resurser" component={Checkbox} />
      </div>
    </div>

  </form>

)

export default reduxForm({
  form: 'itemFilterForm',
  destroyOnUnmount: false,
  initialValues: {
    //order: 'distance_asc',
    display_lend: true,
    display_giveaway: true,
    display_public: true}
})(ItemFilterForm);
