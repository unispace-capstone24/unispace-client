import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./LoginForm.css";

function LoginForm(props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmit(email, password, rememberMe);
  };

  return (
    <div>
      <Form className="login-form" onSubmit={submitHandler}>
        <h1>Login</h1>
        {props.errorMessage && (
          <div className="error-message">{props.errorMessage}</div>
        )}
        <Form.Group className="form-group" controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="form-group" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Check
          className="login-form-remember"
          type="checkbox"
          label="Remember"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <Button
          className="login-form-button"
          variant="outline-primary"
          onClick={() => navigate("/create-account")}
        >
          Create Account
        </Button>
        <Button className="login-form-button" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;