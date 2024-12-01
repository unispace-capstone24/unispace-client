import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080", // Spring Boot 서버의 URL
  withCredentials: true, // 모든 요청에 인증 정보 포함
});

export default instance;