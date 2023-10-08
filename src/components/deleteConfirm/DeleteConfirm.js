import React from 'react'
import { Modal, Button } from "react-bootstrap";
 
const DeleteConfirmation = (props) => {
  const indexo=props.delIndex;
  const deleteFormData = (index) => {
    props.getDeleteDataIndex(index) 
    handleClose()
    };
  
  const handleClose = () => props.setisShowDelete(false);
  const handleShow = () => props.setisShowDelete(true);
    return (


      <Modal show={handleShow} onHide={handleClose}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body><div className="alert "><h5>Are you sure, Once deleted cannot be undone ?</h5></div></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary " onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={()=>{deleteFormData(indexo)}} > 
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
    )
}
 
export default DeleteConfirmation;