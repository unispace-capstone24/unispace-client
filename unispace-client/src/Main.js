import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import SideMenuBar from "./components/SideMenuBar/SideMenuBar";
import TopMenuBar from "./components/TopMenuBar/TopMenuBar";
import Workspace from "./components/Workspace/Workspace";
import MyCalendar from "./components/Schedule/MyCalendar";
import Chatting from "./components/Chatting/Chatting";
import { uiState } from "./contexts/UIState";
import { userInfoState } from "./contexts/UserInfoState";

function Main(props) {
  const navigate = useNavigate();
  const uiInfo = useRecoilValue(uiState);
  const setUserInfo = useSetRecoilState(userInfoState);

  const [loading, setLoading] = useState(true);
  const userInfo = useRecoilValue(userInfoState);

  useEffect(() => {
    const fetchInitialUserInfo = async () => {
      try {
        const userInfo = {
          id: 1,
          name: "User Name",
          logined: true,
          defaultPageId: "pageId123",
          inPersonal: true,
          activeTeamId: null,
          activeChattingRoomId: null,
          teamList: [],
        };

        setUserInfo(userInfo);
        navigate(`/space/${userInfo.defaultPageId}`);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialUserInfo();
  }, [setUserInfo, navigate]);

  if (loading || !userInfo || userInfo.id === null) {
    return <div>Loading...</div>;
  }

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