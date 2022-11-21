import React from 'react';
import PropTypes from 'prop-types';
import style from './header-link.module.css';

function HeaderLink({
  link, children, text, selected,
}) {
  // я не буду менять на простой link,
  // смысл мне переделывать, думать про children ('react/void-dom-elements-no-children')
  // если в след работе меняю на роутинг уже

  const handle = () => {
    console.log(link);
  };

  return (
    <button
      className={`${style.link} text text_type_main-small pl-5 pr-5 pt-4 pb-4 mt-4 mb-4 no-select`}
      type="button"
      onClick={handle}
    >
      {children}
      <span className={`${!selected && 'text_color_inactive'} ml-2`}>{text}</span>
    </button>
  );
}

HeaderLink.propTypes = {
  link: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};

HeaderLink.defaultProps = {
  selected: false,
};

export default HeaderLink;
