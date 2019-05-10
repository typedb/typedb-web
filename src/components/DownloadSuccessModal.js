import React from 'react';
import Modal from 'react-modal';
import NewsletterForm from 'components/NewsletterForm';

const DownloadSuccessModal = ({isOpen, onClose}) => (
  <Modal
    isOpen={isOpen}
    shouldCloseOnOverlayClick={true}
    onRequestClose={onClose}
    ariaHideApp={false}
  >
  <section className="ReactModal__Content__splash">
    <div className="ReactModal__Content__splash__container">
      <span className="ReactModal__Content__splash__header">Thank you for downloading Grakn! </span>
      <span className="ReactModal__Content__splash__text">Your download will begin shortly.</span>
    </div>
    </section>
    <NewsletterForm onSubmit={onClose}/>
  </Modal>
);

export default DownloadSuccessModal;
