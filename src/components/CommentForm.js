import React, { Component } from 'react';
import { connect } from "react-redux";
import { postComment } from "../store/actions/messages";
import {Form, FormGroup, Button} from "reactstrap";

class CommentForm extends Component {
  state = {
    text: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.text === '') return
    this.props.postComment(this.props.messageId, {text: this.state.text})
    this.setState({text: ''})
  }

  render() {
    const {authenticated} = this.props
    return (
      <div>
        {authenticated ? (
          <Form style={{
            padding:"10px 20px", 
            display:"flex", 
            alignItems:"center"
            }} 
            onSubmit={this.handleSubmit}
          >
            <FormGroup style={{width:"87%", marginBottom:"0"}}>
              <textarea
                className="form-control"
                placeholder="Write a comment..."
                onChange={e => this.setState({ text: e.target.value })}
                value={this.state.text}
                name="text"
                rows="1"
                style={{width:"98%", borderRadius:"1rem", overflow:"hidden"}}
              />
            </FormGroup>
            <Button type="submit" outline color="primary">
              Post
            </Button>
          </Form>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser.isAuthenticated
});

export default connect(mapStateToProps, {postComment})(CommentForm)
