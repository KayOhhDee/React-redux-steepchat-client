import React, { Component } from 'react';
import { connect } from "react-redux";
import { editUserInfo } from "../store/actions/user";
import {
  UncontrolledTooltip,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";


class EditInfo extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    modal: false
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = () => {
    const userInfo = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location
    }

    this.props.editUserInfo(userInfo)
    this.toggle()
  }

  componentDidMount() {
    const { currentUser } = this.props;
    this.userInfoPreset(currentUser);
  }

  userInfoPreset = currentUser => {
    this.setState({
      bio: currentUser.bio ? currentUser.bio : "",
      website: currentUser.website ? currentUser.website : "",
      location: currentUser.location ? currentUser.location : ""
    });
  };

  render() {
    return (
      <div style={{height:"50px"}}>
        <span className="card-body-edit">
          <div className="card-info-ico-hover" id="editInfo"  onClick={this.toggle} />
          <FontAwesomeIcon onClick={this.toggle} icon={faPen} />
          <UncontrolledTooltip placement="top" target="editInfo">
            Edit Info
          </UncontrolledTooltip>
        </span>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Edit you info</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="Bio">Bio:</Label>
                <Input
                  type="textarea"
                  placeholder="A short bio about yourself"
                  rows={3}
                  name="bio"
                  value={this.state.bio}
                  onChange={this.handleChange}
                  id="Bio"
                />
              </FormGroup>
              <FormGroup>
                <Label for="Website">Website:</Label>
                <Input
                  type="text"
                  name="website"
                  id="Website"
                  placeholder="Your website/email"
                  value={this.state.website}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Location">Location:</Label>
                <Input
                  type="text"
                  name="location"
                  id="Location"
                  placeholder="Where do you live?"
                  value={this.state.location}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button className="btn-style" style={{backgroundColor:"#8E54E9"}} onClick={this.handleSubmit}>
              Save
            </Button>{" "}
            <Button className="btn-style" color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.user
  }
}

export default connect(mapStateToProps, {editUserInfo})(EditInfo)
