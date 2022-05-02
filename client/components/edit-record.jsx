import React from 'react';
import { Modal, Form } from 'react-bootstrap';

class EditRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: this.props.records,
      modal: true
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.recordInput = this.recordInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggleModal() {
    this.setState({
      modal: false
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  recordInput() {
    const { names, cost } = this.state.records;
    return (
      names.map((item, index) => {
        return (
          <Form.Group key={index}>
            <Form.Control
              type='name'
              name={item}
              value={this.state[item]}
              onChange={this.handleChange}>
            </Form.Control>
            <Form.Control
              type='cost'
              name={item + cost[index]}
              value={this.state[item + cost[index]]}
              onChange={this.handleChange}>
            </Form.Control>
          </Form.Group>
        );
      })
    );
  }

  render() {
    return (
      <>
        <Modal size='md' show={this.state.modal} onHide={this.toggleModal} centered>
          <Modal.Header>
            <Modal.Title className='work-sans'>Edit Records</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.handleSubmit}>
            <Modal.Body className='open-sans'>
              {this.recordInput()}
            </Modal.Body>
          </Form>
        </Modal>
      </>
    );
  }
}

export default EditRecord;
