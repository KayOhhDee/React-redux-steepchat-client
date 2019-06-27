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
    const { email, username, password, profileImageUrl } = this.state
    const { heading, buttonText } = this.props;
    return(
      <div className="row justify-content-md-center text-center">
        <div className="col-md-6">
          <form onSubmit={this.handleSubmit}>
            <h2>{heading}</h2>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
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
              <label for="exampleInputPassword1">Password</label>
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
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default AuthForm;