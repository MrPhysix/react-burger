import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CirclesWithBar } from 'react-loader-spinner';
import style from './form-element.module.css';
import { TAdditionalActions } from '../../types';

interface IFormElement {
  title?: string;
  children: React.ReactNode;
  submitText?: string;
  onSubmit?: Function;
  additionalActions?: TAdditionalActions;
  profile?: boolean;
  isActive: boolean;
  isLoading?: boolean;
}

function FormElement({
  title, children, submitText,
  onSubmit, additionalActions, profile,
  isActive, isLoading,
}: IFormElement) {
  const loader = (
    <CirclesWithBar
      width="24"
      color="#fff"
      ariaLabel="loading"
      wrapperClass="loading-spinner-button"
    />
  );

  // handlers
  const handleSubmit = (evt: React.SyntheticEvent): void => {
    evt.preventDefault();
    onSubmit?.(); // Cannot invoke an object which is possibly 'undefined'. --fix
  };

  return (
    <form
      className={!profile ? style.form : style.formProfile}
      onSubmit={handleSubmit}
    >
      {title && <h2 className="text text_type_main-medium mb-6">{title}</h2>}
      <div className={style.inputs}>{children}</div>
      {submitText && (
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass="mt-6 mb-20"
        disabled={!isActive || isLoading}
      >
        {isLoading ? loader : submitText}
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

FormElement.defaultProps = {
  title: '',
  submitText: null,
  additionalActions: null,
  onSubmit: null,
  isLoading: false,
  profile: false,
};

export default FormElement;
