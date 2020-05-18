import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ field, form: { errors, touched }, ...otherProps }) => {
  const { name, value, onBlur, onChange } = field;
  const fieldError = errors[name];
  const fieldTouched = touched[name];

  return (
    <div className="form-item">
      <label htmlFor={name} className="form-label">
        {otherProps.label}
      </label>
      {otherProps.hint ? <span className="form-hint">{otherProps.hint}</span> : null}
      {fieldError && fieldTouched ? <p className="form-input-msg invalid">{fieldError}</p> : null}
      <input
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        id={name}
        name={name}
        data-testid={name}
        className={`form-input ${fieldError && fieldTouched ? 'invalid' : ''}`}
        type={otherProps.type || 'text'}
        {...otherProps}
      />
    </div>
  );
};

FormInput.propTypes = {
  // Formik FieldProps
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  }).isRequired,

  // Formik FormProps
  form: PropTypes.shape({
    errors: PropTypes.instanceOf(Object),
    touched: PropTypes.instanceOf(Object)
  }).isRequired
};

export default FormInput;
