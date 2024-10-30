import { useRecoilValue } from "recoil";
import { Card, Badge, OverlayTrigger, Popover } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

import { userInfoState } from "../../../contexts/UserInfoState";

function Member(props) {
  const userInfo = useRecoilValue(userInfoState);

  const openChattingHandler = () => {
    console.log("openChattingHandler");
  };

  const deleteFriendHandler = async () => {
    const token = localStorage.getItem("unispace_token");
    await axios.delete(`/friend/${userInfo.id}/${props.memberId}`, {
      headers: { "JWT-Authorization": `Bearer ${token}` },
    });
    window.location.reload();
  };

  return (
    <div>
      {props.isFriend ? (
        <OverlayTrigger
          placement="right"
          trigger="click"
          overlay={
            <OptionPopover>
              <MemberCard body onClick={openChattingHandler}>채팅</MemberCard>
              <MemberCard body onClick={deleteFriendHandler}>삭제</MemberCard>
            </OptionPopover>
          }
        >
          <MemberCard body>
            <Badge pill bg={props.status ? "success" : "danger"}>&nbsp;</Badge>
            &nbsp;{props.memberName}
          </MemberCard>
        </OverlayTrigger>
      ) : (
        <MemberCard body>
          <Badge pill bg={props.status ? "success" : "danger"}>&nbsp;</Badge>
          &nbsp;{props.memberName}
        </MemberCard>
      )}
    </div>
  );
}

export default Member;

export const MemberCard = styled(Card)`
  cursor: pointer;

  &:hover {
    background-color: #f7f7f5;
    transition: 0.5s;
  }
`;

const OptionPopover = styled(Popover)`
  display: flex;
  flex-direction: row;
`;
