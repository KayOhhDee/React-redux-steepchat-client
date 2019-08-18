import React, { Component } from 'react';
import { Spinner } from "reactstrap";

class AuthForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      profileImage: '',
      btnLoader: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ btnLoader: true });
    const authType = this.props.signup ? 'signup' : 'signin';
    this.props.onAuth(authType, this.state).then(_ => {
      this.props.history.push('/')
    }) 
    .catch(() => {
      if(this.props.err.message) {
        this.setState({btnLoader: false})
      }
      return;
    });
  }

  render() {
    const { email, username, password } = this.state
    const { heading, buttonText, signup, err, removeError, history } = this.props;

    history.listen( _ => {
      removeError();
    })

    return (
      <div className="row justify-content-md-center authColor">
        <div className="background-form" />
        <div className="col-md-6 col-lg-4">
          <form onSubmit={this.handleSubmit}>
            <h2 style={{ margin: "2rem 0" }} className="text-center">
              {heading}
            </h2>
            {err.message && (
              <div className="alert alert-danger">{err.message}</div>
            )}
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address:</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={this.handleChange}
                value={email}
                name="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password:</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={this.handleChange}
                value={password}
                name="password"
              />
            </div>
            {signup && (
              <div>
                <div className="form-group">
                  <label htmlFor="exampleInputUsername1">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputUsername1"
                    placeholder="Enter Username"
                    onChange={this.handleChange}
                    value={username}
                    name="username"
                  />
                </div>
              </div>
            )}
            <button
              style={{
                width: "100%",
                backgroundColor: this.state.btnLoader
                  ? "rgba(42,87,235,.4)"
                  : "rgb(42,87,235)"
              }}
              type="submit"
              className="btn btn-primary"
            >
              {buttonText}
              {this.state.btnLoader && (
                <Spinner
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    borderWidth: "inherit",
                    position: "absolute",
                    right: "32px"
                  }}
                  size="sm"
                  color="light"
                />
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AuthForm;