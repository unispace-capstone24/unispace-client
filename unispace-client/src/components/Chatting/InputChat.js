import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Form, InputGroup, Button } from "react-bootstrap";
import styled from "styled-components";
import axios from 'axios';

import { userInfoState } from "../../contexts/UserInfoState";

function InputChat() {
  const userInfo = useRecoilValue(userInfoState);
  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessageHandler = async (event) => {
    event.preventDefault();

    // 이제 실제로 메시지를 보내는 요청을 보냅니다.
    const response = await axios.post(
      `/chat/${userInfo.activeChattingRoomId}/message`,
      {
        content: message,
      }
    );
    console.log(response);

    setMessage("");
  };

  return (
    <ChatInputForm>
      <Form onSubmit={sendMessageHandler}>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={handleMessageChange}
          />
          <Button variant="primary" type="submit">
            Send
          </Button>
        </InputGroup>
      </Form>
    </ChatInputForm>
  );
}

export default InputChat;

const ChatInputForm = styled.div`
  margin: 16px;
`;