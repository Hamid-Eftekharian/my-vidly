import Joi from "joi-browser";
import React, { Component } from "react";
import Input from "./common/input";

class RegisterForm extends Component {
  state = {
    accounts: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Passwordoo"),
    name: Joi.required().label("Namoo"),
  };

  validate = () => {
    const result = Joi.validate(this.state.accounts, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;

    const errors = {};
    result.error.details.map((item) => {
      errors[item.path[0]] = item.message;
    });
    console.log(errors);
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return console.log(errors);
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = this.schema[name];
    const { error } = Joi.validate(obj, schema);

    if (!error) return null;
    return error.details[0].message;
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
        <Input
          name="name"
          value={this.state.accounts.name}
          label="Name"
          onChange={this.handleChange}
          error={this.state.errors.name}
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
        <button
          disabled={this.validate()}
          type="submit"
          className="btn btn-primary"
        >
          Register
        </button>
      </form>
    );
  }
}

export default RegisterForm;
