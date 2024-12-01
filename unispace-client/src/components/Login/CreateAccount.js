import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import CreateAccountForm from "./CreateAccountForm";
import "./CreateAccount.css";

function CreateAccount() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandler = async (email, password, username) => {
    try {
      const response = await axios.post("/member", {
        email: email,
        password: password,
        memberName: username,
      });

      const status = response.status;
      const message = response.data.message;

      if (status === 201 && message === "회원가입 완료") {
        navigate("/login");
      }
    } catch (err) {
      const status = err.response?.data?.status;
      const message = err.response?.data?.message;

      if (status === 409 && message === "이미 존재하는 email 입니다.") {
        setErrorMessage(message);
        return;
      }
      setErrorMessage("알 수 없는 오류가 발생했습니다.");
    }
  };

  return (
    <div className="create-account-form-container">
      <CreateAccountForm onSubmit={submitHandler} errorMessage={errorMessage} />
    </div>
  );
}

export default CreateAccount;