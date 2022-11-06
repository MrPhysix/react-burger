import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import style from './modal.module.css';
import ModalOverlay from './ModalOverlay/ModalOverlay';

const root = document.getElementById('modal');

function Modal({
  children, title, isOpen, handleClose,
}) {
  // handlers
  const handleCloseByKey = (evt) => (evt.key === 'Escape') && handleClose() && evt.target.blur();

  // effects
  useEffect(() => {
    if (!isOpen) return undefined;
    document.addEventListener('keydown', handleCloseByKey);

    return () => document.removeEventListener('keydown', handleCloseByKey);
  }, [isOpen]);

  useEffect(() => { // scroll stop
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  const jsx = (
    <ModalOverlay handleClose={handleClose} isOpen={isOpen}>
      <div className={style.modal}>
        <div className={style.top}>
          <h2 className="text text_type_main-large">{title}</h2>
          <button onClick={handleClose} className={style.button} type="button">&times;</button>
        </div>
        {children}
      </div>
    </ModalOverlay>
  );

  return isOpen ? createPortal(jsx, root) : null;
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  title: '',
};

export default Modal;
