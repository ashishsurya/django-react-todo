import React, { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal show={true} onHide={toggle}>
        <Modal.Header closeButton>Todo Item</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label for='todo-title'>Title</Form.Label>
              <Form.Control
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                type='text'
                placeholder='Enter Todo title'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label for='todo-title'>Description</Form.Label>
              <Form.Control
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                type='text'
                placeholder='Enter Todo description'
              />
            </Form.Group>
            <Form.Check
              type='checkbox'
              label='Completed'
              value={this.props.activeItem.completed}
              onChange={this.handleChange}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button color='success' onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
