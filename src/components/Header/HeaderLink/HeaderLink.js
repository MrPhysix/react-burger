import React from 'react';
import './HeaderLink.css';

function HeaderLink({
  link, children, text, selected,
}) {
  const handleClick = () => {
    console.log('click link to ', link);
  };

  return (
    <button
      className="header__link text text_type_main-small pl-5 pr-5 pt-4 pb-4 mt-4 mb-4"
      onClick={handleClick}
      type="button"
      style={{ cursor: 'pointer' }}
    >
      {children }
      <span className={`${!selected && 'text_color_inactive'} ml-2`}>{text}</span>
    </button>
  );
}

export default HeaderLink;
