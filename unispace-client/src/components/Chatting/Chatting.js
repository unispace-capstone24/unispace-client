import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { Offcanvas } from "react-bootstrap";
import styled from "styled-components";
import { Client } from "@stomp/stompjs";

import Chats from "./Chats";
import InputChat from "./InputChat";
import { uiState } from "../../contexts/UIState";
import { userInfoState } from "../../contexts/UserInfoState";

function Chatting() {
  const [uiInfo, setUiInfo] = useRecoilState(uiState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const client = useRef();

  useEffect(() => {
    connect(); // 컴포넌트 마운트 시 연결
    return () => disconnect(); // 컴포넌트 언마운트 시 연결 해제
  }, []); // 의존성 배열이 비어있어 한 번만 실행됨

  const connect = () => {
    client.current = new Client({
      brokerURL: `ws://localhost:8080/ws`,
      onConnect: () => {
        subscribe();
      },
    });
    client.current.activate();
  };

  const disconnect = () => {
    client.current?.deactivate();
  };

  const subscribe = () => {
    if (userInfo.activeChattingRoomId) {
      client.current?.subscribe(
        `/topic/chat/${userInfo.activeChattingRoomId}`,
        (body) => {
          console.log(body);
        }
      );
    }
  };

  const hideChatting = () => {
    setUserInfo({ ...userInfo, activeChattingRoomId: null });
    setUiInfo({ isChatting: false });
  };

  return (
    <Offcanvas show={uiInfo.isChatting} onHide={hideChatting} placement="end">
      <Offcanvas.Header closeButton></Offcanvas.Header>
      <OffcanvasBody>
        <Chats />
        <InputChat />
      </OffcanvasBody>
    </Offcanvas>
  );
}

export default Chatting;

const OffcanvasBody = styled(Offcanvas.Body)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
`;