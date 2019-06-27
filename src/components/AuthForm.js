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
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { email, username, password, profileImage } = this.state
    const { heading, buttonText, signup } = this.props;
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <form onSubmit={this.handleSubmit}>
            <h2 className="text-center">{heading}</h2>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address:</label>
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
              <label for="exampleInputPassword1">Password:</label>
              <input
                type="password"
                class="form-control"
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
                  <label for="exampleInputUsername1">Username:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputUsername1"
                    placeholder="Enter Username"
                    onChange={this.handleChange}
                    value={username}
                    name="username"
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Profile Image:</label>
                  <input
                    type="text"
                    class="form-control"
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
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AuthForm;