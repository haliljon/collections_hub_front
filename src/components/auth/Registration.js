import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event) {
        const { email, password, password_confirmation } = this.state;
        axios.post("http://localhost:3001/registrations", {
            user: {
                email,
                password,
                password_confirmation
            }
        },
            { withCredentials: true }
        ).then(response => {
            if (response.data.status === "created") {
                this.props.handleSuccessfulAuth(response.data);
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
            <form onSubmit={this.handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                <input type="password" name="password_confirmation" placeholder="Password confirmation" value={this.state.password_confirmation} onChange={this.handleChange} required />
                <button type="submit">Register</button>
            </form>
        );
    }
}