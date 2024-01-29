import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import JoblyApi from "../../api";
import userContext from "../../userContext";
import "./SignUpForm.css"

function SignUpForm({ logIn }) {
  // create state for form, navigations, and bring in user context obj
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  // const user = useContext(userContext);

  // use form data to register and logIn from App.js and JoblyApi static method
  const register = async () => {
    let res = await JoblyApi.registerUser(formData);
    // console.log(`SignupForm register results: ${res}`);
    if (res && res.token) {
      logIn({ username: formData.username, token: res.token });
      navigate("/");
    } else {
      alert(`throw an error here`);
    }
  };

  // on change, update the inputs accordingly but targeting the name and values, collecting the rest of known data and updating to new values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
    setFormData({});
  };

  return (
    <div className="signup-form-container">
      <div className="signup-form-content">
        <h3>Sign Up</h3>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="userName">Username</Label>
            <Input
              id="userName"
              name="username"
              type="text"
              value={formData.username || ""}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password || ""}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName || ""}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName || ""}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email || ""}
              onChange={handleChange}
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    </div>
  );
}

export default SignUpForm;