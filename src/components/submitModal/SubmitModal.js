import { Button, Modal } from 'react-bootstrap'
import './Modal.css';
function SubmitModal(props) {

  const handleClose = () => props.setisShowSubmitModal(false);
  const handleShow = () => props.setisShowSubmitModal(true);

  return (
    <div >
      <Modal show={handleShow} onHide={handleClose} className="modal__main"
        size="sm"
        show={handleShow}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-md"
      >

        <Modal.Body id="example-modal-sizes-title-md">
          <div  >
            <div id="container">
            <div id="success"><i className="far fa-check-circle"></i></div>
            <p id="text">Successfully Uploaded</p>
            <div id="btn"><Button onClick={ handleClose } id="button">OK</Button></div>
            </div>
          </div>
        </Modal.Body>

      </Modal>

    </div>
  );

}
export default SubmitModal