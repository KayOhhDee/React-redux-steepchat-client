import React from 'react';
import { Switch, Route, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/error';
import withAuth from '../hocs/withAuth';
import MessageForm from '../containers/MessageForm';
import User from './User';
import AuthUser from './AuthUser';

const Main = props => {
  const {authUser, error, removeError, currentUser} = props
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" render={props => <Homepage currentUser={currentUser} {...props} />} />
        <Route
          exact
          path="/signin"
          render={props => {
            return (
              <AuthForm
                removeError={removeError}
                err={error}
                onAuth={authUser}
                buttonText="Log in"
                heading="Welcome Back!"
                {...props}
              />
            );
          }}
        />
        <Route
          exact
          path="/signup"
          render={props => {
            return (
              <AuthForm
                removeError={removeError}
                err={error}
                onAuth={authUser}
                buttonText="Sign me up!"
                heading="Join SteepChat Now!"
                signup
                {...props}
              />
            );
          }}
        />
        <Route exact path="/users/:id" component={User} />
        <Route exact path="/user/profile" component={AuthUser} />
        <Route exact path="/users/:id/message/:messageId" component={User} />
        <Route path="/" component={withAuth(MessageForm)} />
      </Switch>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    error: state.errors
  };
}

export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main));