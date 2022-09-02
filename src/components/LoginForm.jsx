import Joi from "joi-browser";
import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    accounts: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
  };

  validate = () => {
    const result = Joi.validate(this.state.accounts, this.schema);
    console.log(result);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return console.log(errors);
  };

  validateProperty = (input) => {
    if (input.name === "username") {
      if (input.value.trim() === "") return "Username is required.";
    }

    if (input.name === "password") {
      if (input.value.trim() === "") return "Password is required.";
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = this.state.errors;
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const accounts = this.state.accounts;
    accounts[input.name] = input.value;
    this.setState({ accounts, errors });
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
