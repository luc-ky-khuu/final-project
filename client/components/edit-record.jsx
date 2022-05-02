import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  deleteModal() {
    return (
      <>
        <Modal size='sm' centered show={this.state.deleteModal} onHide={this.toggleDeleteModal}>
          <Modal.Body>
            <p className='fs-4 m-0'>
              Are you sure you want to remove this car?  This will delete all of your data.
            </p>
          </Modal.Body>
          <Modal.Footer className='work-sans'>
            <div className='col'>
              <Button variant='outline-dark' className='w-100 work-sans' onClick={this.toggleDeleteModal}>
                Cancel
              </Button>
            </div>
            <div className='col'>
              <Button variant='danger' className='w-100 border-0 red-button work-sans' onClick={this.deleteCar}>
                Delete
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

}

export default ConfirmationModal;
