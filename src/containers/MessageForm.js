import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  UncontrolledTooltip
} from "reactstrap";
import { postNewMessage } from '../store/actions/messages';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      modal: false
    };
  }

  handleSubmit = (e) => {
    this.handleNewMessage(e)
  }

  handleNewMessage = e => {
    e.preventDefault();
    this.props.postNewMessage(this.state.message);
    this.setState({ message:'' });
    this.state.message && this.toggle();
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    this.props.errors.message = ''
  }

  render() {
    return (
      <div>
        <div id="NewMessage">
          <Link onClick={this.toggle}>
            <FontAwesomeIcon icon={faPlus} />
          </Link>
          <UncontrolledTooltip placement="top" target="NewMessage">
            New Post
          </UncontrolledTooltip>
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            {"Post a new message"}
          </ModalHeader>
          <ModalBody>
            <Form>
              {this.props.errors.message && (
                <div className="alert alert-danger">
                  {this.props.errors.message}
                </div>
              )}
              <FormGroup>
                <textarea
                  className="form-control"
                  placeholder="What's on your mind?"
                  onChange={e => this.setState({ message: e.target.value })}
                  value={this.state.message}
                  name="message"
                  rows="6"
                  required
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>
              Post
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { postNewMessage })(MessageForm);