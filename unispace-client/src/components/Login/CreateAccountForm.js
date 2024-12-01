import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "axios";

import "./CreateAccountForm.css";

function CreateAccountForm(props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [touchPassword, setTouchPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 추가

  const submitHandler = async (event) => {
    setTouchPassword(true);

    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    // 회원가입 API 요청
    try {
      const response = await axios.post("/member", {
        email: email,
        password: password,
        memberName: username,
      });

      const status = response.status;
      const message = response.data.message;

      if (status === 201 && message === "회원가입 완료") {
        navigate("/login");  // 회원가입 후 로그인 페이지로 리다이렉트
      }
    } catch (err) {
      const status = err.response?.data?.status;
      const message = err.response?.data?.message;

      // 오류 메시지 처리
      if (status === 409 && message === "이미 존재하는 email 입니다.") {
        setErrorMessage("이미 존재하는 이메일입니다.");
      } else {
        setErrorMessage("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
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
            isInvalid={touchPassword && password.length < 8}
          />
          <Form.Control.Feedback type="invalid">
            비밀번호는 최소 8자 이상이어야 합니다.
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
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
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