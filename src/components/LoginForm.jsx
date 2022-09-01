import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    accounts: { username: "", password: "" },
    errors: {},
  };

  validate = () => {
    const errors = {};

    if (this.state.accounts.username.trim() === "")
      errors.username = "Username is required.";
    if (this.state.accounts.password.trim() === "")
      errors.password = "Password is required.";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return console.log(errors);
  };

  handleChange = (e) => {
    const accounts = this.state.accounts;
    accounts[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ accounts });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          name="username"
          value={this.state.accounts.username}
          label="Username"
          onChange={this.handleChange}
          error={this.state.errors.username}
        />
        <Input
          name="password"
          value={this.state.accounts.password}
          label="Password"
          onChange={this.handleChange}
          error={this.state.errors.password}
        />

        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default LoginForm;
