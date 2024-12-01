import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import axios from "axios";

import Chat from "./Chat";
import { userInfoState } from "../../contexts/UserInfoState";

function Chats() {
  const userInfo = useRecoilValue(userInfoState);
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   const fetchChattingRoom = async () => {
  //     const token = localStorage.getItem("unispace_token");
  //     const response = await axios.get(
  //       `/chat/room/${userInfo.activeChattingRoomId}`,
  //       {
  //         headers: { "JWT-Authorization": `Bearer ${token}` },
  //       }
  //     );
  //     setMessages(response.data.data.messageList);
  //   };

  //   fetchChattingRoom();
  // }, [userInfo.activeChattingRoomId]);

  return (
    <ChatsWrapper>
      {/* {messages.map((m) => {
        const isMyChat = m.senderId === userInfo.id;
        return (
          <Chat
            key={m.sendTime}
            myChat={isMyChat}
            name={m.senderName}
            message={m.content}
          />
        );
      })} */}
    </ChatsWrapper>
  );
}

export default Chats;

const ChatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  padding: 16px;
`;
