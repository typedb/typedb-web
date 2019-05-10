import React from 'react';
import Modal from 'react-modal';
import ContactForm from 'components/ContactForm';

const ContactFormModal = ({pageTitle, pageUri, isOpen, onClose}) => (
  <Modal
    isOpen={isOpen}
    shouldCloseOnOverlayClick={true}
    onRequestClose={onClose}
    ariaHideApp={false}
  >
    <i className="fa fa-times ReactModal__Closebtn" onClick={() => onClose()}/>
    <ContactForm pageTitle={pageTitle} pageUri={pageUri} onSuccess={onClose} />
  </Modal>
);

export default ContactFormModal;