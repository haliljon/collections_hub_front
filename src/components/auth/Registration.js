import React from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
/* eslint-disable */
console.log('API_BASE_URL', API_BASE_URL);
export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            password_confirmation: "",
            registrationErrors: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event) {
        const { email, username, password, password_confirmation } = this.state;

        axios.post(`${API_BASE_URL}/registrations`, {
            user: {
                email,
                username,
                password,
                password_confirmation
            }
        },
            { withCredentials: true }
        ).then(response => {
            if (response.data.status === "created") {
                this.props.handleSuccessfulAuth(response.data);
                const { role, id, username, password_digest } = response.data.user
                localStorage.setItem('password_digest', password_digest)
                localStorage.setItem('role', role)
                localStorage.setItem('id', id)
                localStorage.setItem('username', username)
            }
            console.log('registration res', response);
        }).catch(error => {
            console.log("registration error", error);
        });
        event.preventDefault();
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
            <div className="col-md col-sm-12 col-xs-12 container-main d-flex flex-row align-items-center login p-0 mt-5">
                <div className="col-md-12 d-flex flex-column align-items-center session-overlay justify-content-center mt-5">
                    <div className="input-box col-md d-flex flex-column align-items-center justify-content-center">
                        <div className="intro">
                            <span className="line" />
                            <h4 className="intro__title">Welcome to Collections Hub</h4>
                            <p className="intro__text">Sign up to get started!</p>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} required />
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label for="name1">Full Name</label>
                                <input type="text" class="form-control" id="name1" name="username" aria-describedby="usernameHelp" placeholder="Enter your name" value={this.state.username} onChange={this.handleChange} required />
                                <small id="usernameHelp" class="form-text text-muted">It could be any name or nickname.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword2">Password Confirmation</label>
                                <input type="password" class="form-control" id="exampleInputPassword2" name="password_confirmation" placeholder="Password Confirmation" value={this.state.password_confirmation} onChange={this.handleChange} required />
                            </div>
                            <button type="submit" class="btn btn-success float-end mt-3">Register</button>
                        </form>
                        <hr />
                        <p>Do you already have an account?</p>
                        <a href="/signin" class="btn btn-outline-success">Sign in</a>
                    </div>
                </div>
            </div>
        );
    }
}
/* eslint-enable */
