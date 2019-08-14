import React, { Component } from 'react';
import {Button, Modal, ModalBody, ModalFooter } from "reactstrap";

class DeleteMessage extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleDelete = () => {
    this.props.removeMessage()
    this.toggle()
  }

  render() {
    return (
      <div>
        <div onClick={this.toggle} >Delete</div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalBody>
            {"Are you sure you want to delete this post?"}
          </ModalBody>
          <ModalFooter>
            <Button className="btn-style" color="danger" onClick={this.handleDelete}>Delete</Button>{' '}
            <Button className="btn-style" color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DeleteMessage
