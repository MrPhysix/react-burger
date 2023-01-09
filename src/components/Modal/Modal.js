import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import style from './modal.module.css';
import ModalOverlay from './ModalOverlay/ModalOverlay';

const root = document.getElementById('modal');

function Modal({
  children, title, handleClose,
}) {
  // handlers
  const handleCloseByKey = (evt) => (evt.key === 'Escape') && handleClose() && evt.target.blur();

  // effects
  useEffect(() => {
    document.addEventListener('keydown', handleCloseByKey);
    document.body.style.overflow = 'hidden';// scroll stop

    return () => {
      document.removeEventListener('keydown', handleCloseByKey);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const jsx = (
    <>
      <div className={style.modal}>
        <div className={style.top}>
          <h2 className="text text_type_main-large">{title}</h2>
          <button onClick={handleClose} className={style.button} type="button">&times;</button>
        </div>
        {children}
      </div>
      <ModalOverlay handleClose={handleClose} />
    </>
  );

  return createPortal(jsx, root);
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  title: '',
};

export default Modal;
