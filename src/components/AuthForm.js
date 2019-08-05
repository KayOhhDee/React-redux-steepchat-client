import React, { Component } from 'react';

class AuthForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      profileImage: ''
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
    const authType = this.props.signup ? 'signup' : 'signin';
    this.props.onAuth(authType, this.state).then(_ => {
      this.props.history.push('/')
    }) 
    .catch(() => {
      return;
    });
  }

  render() {
    const { email, username, password, profileImage } = this.state
    const { heading, buttonText, signup, err, removeError, history } = this.props;

    history.listen( _ => {
      removeError();
    })

    return (
      <div className="row justify-content-md-center authColor">
        <div className="background-form" />
        <div className="col-md-6">
          <form onSubmit={this.handleSubmit}>
            <h2 className="text-center">{heading}</h2>
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
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Profile Image:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleProfileImage1"
                    placeholder="Enter Image URL"
                    onChange={this.handleChange}
                    value={profileImage}
                    name="profileImage"
                  />
                </div>
              </div>
            )}
            <button type="submit" className="btn btn-primary">
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AuthForm;