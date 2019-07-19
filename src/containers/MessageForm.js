import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewMessage } from '../store/actions/messages';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }

  handleNewMessage = e => {
    e.preventDefault();
    this.props.postNewMessage(this.state.message);
    this.setState({ message:'' });
    this.props.history.push('/');
  }

  render() {
    return (
      <form onSubmit={this.handleNewMessage}>
        {this.props.errors.message && (
          <div className="alert alert-danger">
            {this.props.errors.message}
          </div>
        )}
        <div className="row justify-content-md-center">
          <div className="background-form"/>
          <div className="col-md-6">
            <textarea
              className="form-control"
              id="exampleMessage1"
              placeholder="Enter message"
              onChange={e => this.setState({ message: e.target.value })}
              value={this.state.message}
              name="message"
              rows="6"
            />
            <button type="submit" className="btn btn-success">
              Post
            </button>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { postNewMessage })(MessageForm);