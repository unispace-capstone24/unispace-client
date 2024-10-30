import { useEffect, useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { userInfoState } from "../../contexts/UserInfoState";
import LoginForm from "./LoginForm";
import "./Login.css";

axios.defaults.withCredentials = true;

export function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function Login() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [errorMessage, setErrorMessage] = useState("");

  // processingLogin 함수는 useCallback으로 감싸서 메모이제이션
  const processingLogin = useCallback(async () => {
    const token = localStorage.getItem("unispace_token");

    const userInfoResponse = await axios.get(`/member`, {
      headers: { "JWT-Authorization": `Bearer ${token}` },
    });
    const fetchedUserInfo = userInfoResponse.data.data;
    const userId = fetchedUserInfo.id;

    setUserInfo({
      ...userInfo,
      id: userId,
      logined: true,
      inPersonal: true,
      activeTeamId: null,
    });

    const pageInfoResponse = await axios.get(`/member/${userId}/space`, {
      headers: { "JWT-Authorization": `Bearer ${token}` },
    });

    const pageInfo = pageInfoResponse.data.data;
    const pageId = pageInfo.pageList[0].pageId;

    setUserInfo({
      ...userInfo,
      id: userId,
      logined: true,
      inPersonal: true,
      activeTeamId: null,
      defaultPageId: pageId,
    });
    navigate(`/space/${pageId}`);
  }, [navigate, setUserInfo, userInfo]);

  useEffect(() => {
    const token = localStorage.getItem("unispace_token");
    const now = Math.floor(new Date().getTime() / 1000);
    if (token && parseJwt(token).exp > now) {
      processingLogin();
    }
  }, [processingLogin]); // 종속성 배열에 processingLogin 추가

  const loginHandler = async (email, password, rememberMe) => {
    try {
      const response = await axios.post(
        `/login-process`,
        {
          email: email,
          password: password,
          "remember-me": rememberMe,
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      const token = response.data.token;

      localStorage.setItem("unispace_token", token);
      const iat = parseJwt(token).iat;
      const exp = parseJwt(token).exp;

      setTimeout(() => {
        localStorage.removeItem("unispace_token");
      }, (exp - iat) * 1000);

      processingLogin();
    } catch (error) {
      if (error.message === "Network Error") {
        setErrorMessage("존재하지 않는 계정이나 잘못된 비밀번호 입니다.");
        return;
      }
    }
  };

  return (
    <div className="login-form-container">
      <LoginForm onSubmit={loginHandler} errorMessage={errorMessage} />
    </div>
  );
}

export default Login;
