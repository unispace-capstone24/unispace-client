import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { Offcanvas } from "react-bootstrap";
import styled from "styled-components";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";

import Chats from "./Chats";
import InputChat from "./InputChat";
import { uiState } from "../../contexts/UIState";
import { userInfoState } from "../../contexts/UserInfoState";

function Chatting() {
  const [uiInfo, setUiInfo] = useRecoilState(uiState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const client = useRef();

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  const connect = () => {
    const token = localStorage.getItem("withspace_token");
    client.current = new Client({
      brokerURL: `wss://api.withspace-api.com/chat`,
      connectHeaders: {
        "JWT-Authorization": `Bearer ${token}`,
      },
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
    client.current?.subscribe(
      `/topic/chat/${userInfo.activeChattingRoomId}`,
      (body) => {
        console.log(body);
      }
    );
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
