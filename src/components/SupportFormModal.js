import React from 'react';
import Modal from 'react-modal';
import SupportForm from 'components/SupportForm';

const SupportFormModal = ({pageTitle, pageUri, isOpen, onClose}) => (
  <Modal
    isOpen={isOpen}
    shouldCloseOnOverlayClick={true}
    onRequestClose={onClose}
    ariaHideApp={false}
  >
    <i className="fa fa-times ReactModal__Closebtn" onClick={() => onClose()}/>
    <SupportForm pageTitle={pageTitle} pageUri={pageUri} onSuccess={onClose} />
  </Modal>
);

export default SupportFormModal;