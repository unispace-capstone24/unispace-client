import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import SideMenuBar from "./components/SideMenuBar/SideMenuBar";
import TopMenuBar from "./components/TopMenuBar/TopMenuBar";
import Workspace from "./components/Workspace/Workspace";
import MyCalendar from "./components/Schedule/MyCalendar";
import Chatting from "./components/Chatting/Chatting";
import { uiState } from "./contexts/UIState";
import { userInfoState } from "./contexts/UserInfoState";
import { parseJwt } from "./components/Login/Login";

function Main(props) {
  const navigate = useNavigate();

  const uiInfo = useRecoilValue(uiState);
  const setUserInfo = useSetRecoilState(userInfoState);

  useEffect(() => {
    const fetchInitialUserInfo = async () => {
      const token = localStorage.getItem("withspace_token");

      // 토큰이 없거나 만료된 경우 로그인 페이지로 리다이렉트
      if (token === null) {
        navigate("/login");
        return;
      } else {
        const now = Math.floor(new Date().getTime() / 1000);
        if (parseJwt(token).exp < now) {
          localStorage.removeItem("withspace_token");
          navigate("/login");
          return;
        }
      }

      // 유저 정보 가져오기
      const memberInfoRes = await axios.get(`/member`, {
        headers: { "JWT-Authorization": `Bearer ${token}` },
      });
      const userInfo = memberInfoRes.data.data;

      // 스페이스 정보 가져오기
      const spaceInfoRes = await axios.get(`/space/${userInfo.spaceId}`, {
        headers: { "JWT-Authorization": `Bearer ${token}` },
      });
      const spaceInfo = spaceInfoRes.data;
      const defaultPageId = spaceInfo.pageList[0].pageId;

      setUserInfo({
        id: userInfo.id,
        name: userInfo.memberName,
        logined: false,
        defaultPageId: defaultPageId,
        inPersonal: true,
        activeTeamId: null,
        activeChattingRoomId: null,
        teamList: userInfo.teamList,
      });

      return <Navigate to={`/space/${defaultPageId}`} />;
    };

    fetchInitialUserInfo();
  }, [setUserInfo, navigate]);

  return (
    <>
      <SideWrapper>
        <SideMenuBar />
      </SideWrapper>
      <div className="main">
        <TopMenuBar />
        {props.space === "space" && <Workspace />}
        {props.space === "schedule" && <MyCalendar />}
      </div>
      {uiInfo.isChatting && <Chatting />}
    </>
  );
}

export default Main;

const SideWrapper = styled.div`
  overflow: scroll;
  width: 20%;
  height: 100vh;
  background-color: #f7f7f5;
`;
