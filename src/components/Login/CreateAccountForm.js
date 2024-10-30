import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { AiOutlineArrowLeft } from "react-icons/ai";

import "./CreateAccountForm.css";

function CreateAccountForm(props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [touchPassword, setTouchPassword] = useState(false);
  const [validated, setValidated] = useState(false);

  const submitHandler = (event) => {
    setTouchPassword(true);

    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    props.onSubmit(email, password, username);
  };

  return (
    <div>
      <div>
        <AiOutlineArrowLeft
          className="back-to-login-button"
          onClick={() => navigate("/login")}
        />
        <span className="back-to-login-label">로그인 페이지로 돌아가기</span>
      </div>
      <Form
        className="create-account-form"
        noValidate
        validated={validated}
        onSubmit={submitHandler}
      >
        <h1>Create Account</h1>
        <Form.Group className="form-group" controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            올바른 이메일 형식이 아닙니다.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-group" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            isInvalid={touchPassword && password.length < 6}
          />
          <Form.Control.Feedback type="invalid">
            비밀번호는 최소 6자 이상이어야 합니다.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-group" controlId="formGroupUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            닉네임은 필수 입력 항목입니다.
          </Form.Control.Feedback>
        </Form.Group>
        {props.errorMessage && (
          <div className="error-message">{props.errorMessage}</div>
        )}
        <Button
          className="create-account-form-button"
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateAccountForm;
