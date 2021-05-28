/* eslint-disable no-useless-escape */

import React from "react";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      email: null,
      password: null,
      errors: {
        fullName: "",
        email: "",
        password: ""
      }
    };
  }
  handleChange = (event) => {
    event.preventDefault();
    // const { name, value } = event.target;
    let name = event.target.name;
    let value = event.target.value;
    let errors = this.state.errors;

    switch (name) {
      case "fullName":
        errors.fullName =
          value.length < 5 ? "Full Name must be 5 characters long!" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value }, () => {
      console.log(errors);
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm(this.state.errors)) {
      console.info("Valid Form");
    } else {
      console.error("Invalid Form");
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <h1>Hello</h1>
        <form className="form">
          <input
            type="text"
            placeholder="Name"
            name="fullName"
            onChange={this.handleChange}
          />
          {errors.fullName.length > 0 && <span>{errors.fullName}</span>}
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={this.handleChange}
          />
          {errors.email.length > 0 && <span>{errors.email}</span>}
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
          />
          {errors.password.length > 0 && <span>{errors.password}</span>}
          <button type="submit" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default Form;
