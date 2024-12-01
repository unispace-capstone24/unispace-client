import { useEffect, useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { userInfoState } from "../../contexts/UserInfoState";
import LoginForm from "./LoginForm";
import "./Login.css";

// axios 기본 URL 설정
axios.defaults.baseURL = 'http://localhost:8080'; // 백엔드 서버 주소
axios.defaults.withCredentials = true; // 세션 쿠키 포함

function Login() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [errorMessage, setErrorMessage] = useState("");

  const processingLogin = useCallback(async () => {
    try {
      // 로그인 상태 체크
      const userInfoResponse = await axios.get(`/member`);
      const fetchedUserInfo = userInfoResponse.data.data;
      const userId = fetchedUserInfo.id;

      setUserInfo({
        ...userInfo,
        id: userId,
        logined: true,
        inPersonal: true,
        activeTeamId: null,
      });

      const pageInfoResponse = await axios.get(`/member/${userId}/space`);
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
    } catch (error) {
      console.error("로그인 상태 체크 오류:", error.response?.data || error.message);
    }
  }, [navigate, setUserInfo, userInfo]);

  useEffect(() => {
    // 로그인 상태 체크
    processingLogin();
  }, [processingLogin]);

  const loginHandler = async (email, password, rememberMe) => {
    try {
      const response = await axios.post("/login-process", {
        email: email,
        password: password,
        "remember-me": rememberMe,
      });
  
      // 응답을 사용하여 추가 처리
      if (response.status === 200) {
        console.log("로그인 성공", response.data);
        processingLogin(); // 로그인 성공 후 처리
      }
    } catch (error) {
      setErrorMessage("로그인 실패: 이메일 또는 비밀번호를 확인해주세요.");
      console.error("로그인 실패:", error.response?.data || error.message);
    }
  };

  return (
    <div className="login-form-container">
      <LoginForm onSubmit={loginHandler} errorMessage={errorMessage} />
    </div>
  );
}

export default Login;