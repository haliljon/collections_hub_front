import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { API_BASE_URL } from '../api';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const { email, password } = this.state;
    const { handleSuccessfulAuth } = this.props;
    axios.post(`${API_BASE_URL}/sessions`, {
      user: {
        email,
        password,
      },
    },
    { withCredentials: true }).then((response) => {
      if (response.data.logged_in) {
        handleSuccessfulAuth(response.data);
        const {
          role, id, username, passwordDigest,
        } = response.data.user;
        localStorage.setItem('password_digest', passwordDigest);
        localStorage.setItem('role', role);
        localStorage.setItem('id', id);
        localStorage.setItem('username', username);
      }
      console.log('login res', response);
    }).catch((error) => {
      console.log('login error', error);
    });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { password, email } = this.state;
    return (
      <div className="col-md col-sm-12 col-xs-12 container-main d-flex flex-row align-items-center login p-0 mt-5">
        <div className="col-md-12 d-flex flex-column align-items-center session-overlay justify-content-center mt-5">
          <div className="input-box col-md d-flex flex-column align-items-center justify-content-center">
            <div className="intro">
              <span className="line" />
              <h4 className="intro__title">Welcome to Collections Hub</h4>
              <p className="intro__text">Login to get started!</p>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  Email address
                  <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={this.handleChange} required />
                </label>
                <small id="emailHelp" className="form-text text-muted">{'We\'ll never share your email with anyone else.'}</small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">
                  Password
                  <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password" value={password} onChange={this.handleChange} required />
                </label>
              </div>
              <button type="submit" className="btn btn-success float-end mt-3">Login</button>
            </form>
            <hr />
            <p>{'Don\'t have account'}</p>
            <a href="/signup" className="btn btn-outline-success">Sign up</a>
          </div>
        </div>
      </div>
    );
  }
}

// prop validation
Login.propTypes = {
  handleSuccessfulAuth: PropTypes.func.isRequired,
};
