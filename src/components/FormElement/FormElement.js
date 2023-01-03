import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import style from './form-element.module.css';

function FormElement({
  title, children, submitText,
  onSubmit, additionalActions, profile, isActive,
}) {
  return (
    <form
      className={!profile ? style.form : style.formProfile}
      onSubmit={(evt) => { evt.preventDefault(); onSubmit(); console.log('onSubmit', onSubmit); }}
    >
      {title && <h2 className="text text_type_main-medium mb-6">{title}</h2>}
      <div className={style.inputs}>{children}</div>
      {submitText && (
      <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20" disabled={!isActive}>
        {submitText}
      </Button>
      )}
      {additionalActions && (
      <ul className={style.actions}>
        {additionalActions?.map((item) => (
          <p key={item.text} className="text text_type_main-default text_color_inactive">
            {item.text}
            {' '}
            {item.link && (
            <Link
              to={item.link?.path}
              className={`text text_type_main-default ${style.linkText}`}
            >
              {item.link?.text}
            </Link>
            )}
          </p>
        ))}
      </ul>
      )}
    </form>
  );
}

FormElement.propTypes = {
  title: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
  submitText: PropTypes.string,
  onSubmit: PropTypes.func,
  additionalActions: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    link: PropTypes.shape({
      path: PropTypes.string,
      text: PropTypes.string,
    }),
  })),
  isActive: PropTypes.bool.isRequired,
};

FormElement.defaultProps = {
  title: '',
  submitText: null,
  additionalActions: null,
  onSubmit: null,
};

export default FormElement;
