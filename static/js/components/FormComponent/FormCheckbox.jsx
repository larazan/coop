import PropTypes from 'prop-types';
import React from 'react';

const Input = ({ field, initialValue, onChangeCallback, setFieldValue }) => {
  const inputProps = {
    ...field,
    type: 'checkbox',
    'data-testid': field.name,
    id: field.name,
    className: 'form-checkbox-input',
    value: initialValue || true,
    defaultChecked: initialValue
  };

  // handle a custom on change event
  if (onChangeCallback && setFieldValue) {
    inputProps.onChange = e => {
      onChangeCallback(e.target.checked);
      // forward to default handler (needs to be passed from Formik)
      setFieldValue(field.name, e.target.checked);
    };
  }

  return <input {...inputProps} />;
};

Input.propTypes = {
  field: PropTypes.instanceOf(Object).isRequired,
  initialValue: PropTypes.bool,
  onChangeCallback: PropTypes.func,
  setFieldValue: PropTypes.func
};

Input.defaultProps = {
  initialValue: false,
  onChangeCallback: null,
  setFieldValue: null
};

const FormCheckbox = ({
  field,
  hint,
  initialValue,
  label,
  onChangeCallback,
  setFieldValue,
  text
}) => {
  return (
    <div className="form-item">
      {label ? (
        <label htmlFor={field.name} className="form-label">
          {label}
        </label>
      ) : null}
      {hint ? <span className="form-hint">{hint}</span> : null}
      <label className="form-checkbox" htmlFor={field.name}>
        <Input
          field={field}
          initialValue={initialValue}
          onChangeCallback={onChangeCallback}
          setFieldValue={setFieldValue}
        />
        {text}
      </label>
    </div>
  );
};

FormCheckbox.propTypes = {
  field: PropTypes.instanceOf(Object).isRequired,
  label: PropTypes.string,
  text: PropTypes.node.isRequired,
  hint: PropTypes.string,
  initialValue: PropTypes.bool,
  onChangeCallback: PropTypes.func,
  setFieldValue: PropTypes.func
};

FormCheckbox.defaultProps = {
  label: null,
  hint: null,
  initialValue: false,
  onChangeCallback: null,
  setFieldValue: null
};

export default FormCheckbox;
