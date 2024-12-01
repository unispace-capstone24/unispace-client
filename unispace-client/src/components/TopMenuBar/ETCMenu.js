import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Popover, Card } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import styled from "styled-components";
import axios from 'axios';

import { MenuButton } from "./TopMenuBar";

function ETCMenu() {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    // 로그아웃 API 호출
    await axios.post(`/logout`, {});
    navigate("/login");
  };

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={
        <Popover>
          <Popover.Body style={{ padding: "0" }}>
            <OptionCard body onClick={logoutHandler}>
              로그아웃
            </OptionCard>
          </Popover.Body>
        </Popover>
      }
    >
      <MenuButton>
        <BsThreeDots />
      </MenuButton>
    </OverlayTrigger>
  );
}

export default ETCMenu;

const OptionCard = styled(Card)`
  cursor: pointer;

  &:hover {
    background-color: #f7f7f5;
    transition: 0.5s;
  }
`;