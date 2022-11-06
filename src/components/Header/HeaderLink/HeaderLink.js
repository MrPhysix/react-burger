import React from 'react';
import PropTypes from 'prop-types';
import style from './header-link.module.css';

function HeaderLink({
  link, children, text, selected,
}) {
  const handleClick = () => {
    console.log('click link to ', link);
  };

  return (
    <button
      className={`${style.link} text text_type_main-small pl-5 pr-5 pt-4 pb-4 mt-4 mb-4 no-select`}
      onClick={handleClick}
      type="button"
    >
      {children }
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
