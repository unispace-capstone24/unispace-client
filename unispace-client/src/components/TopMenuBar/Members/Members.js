import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { BsFillPeopleFill } from "react-icons/bs";
import { GrFormRefresh } from "react-icons/gr";
import styled from "styled-components";
import axios from 'axios';

import Member from "./Member";
import AddNewFriendButton from "./AddNewFriendButton";
import { MenuButton } from "../TopMenuBar";
import { userInfoState } from "../../../contexts/UserInfoState";
import { useTeamState } from "../../../contexts/TeamContext";

function Members() {
  const teamState = useTeamState();
  const userInfo = useRecoilValue(userInfoState);
  const [friendInfo, setFriendInfo] = useState();
  const [teamMemberInfo, setTeamMemberInfo] = useState();

  useEffect(() => {
    if (userInfo.inPersonal && !userInfo.activeTeamId) {
      const fetchFriendInfo = async () => {
        const response = await axios.get(`/${userInfo.id}/friend`);
        setFriendInfo(response.data.data);
      };
      fetchFriendInfo();
    }

    if (!userInfo.inPersonal && userInfo.activeTeamId) {
      const fetchTeamMemberInfo = async () => {
        const response = await axios.get(`/team/${userInfo.activeTeamId}`);
        setTeamMemberInfo(response.data.data.memberTeamList);
      };
      fetchTeamMemberInfo();
    }
  }, [userInfo]);

  const refreshFriendList = async () => {
    if (userInfo.inPersonal && !userInfo.activeTeamId) {
      const fetchFriendInfo = async () => {
        const response = await axios.get(`/${userInfo.id}/friend`);
        setFriendInfo(response.data.data);
      };
      fetchFriendInfo();
    }

    if (!userInfo.inPersonal && userInfo.activeTeamId) {
      const fetchTeamMemberInfo = async () => {
        const response = await axios.get(`/team/${userInfo.activeTeamId}`);
        setTeamMemberInfo(response.data.data.memberTeamList);
      };
      fetchTeamMemberInfo();
    }
  };

  return (
    <OverlayTrigger
      placement="bottom"
      trigger="click"
      overlay={
        <CustomPopover>
          <PopoverHeader>
            <span>친구 목록</span>
            <RefreshIcon fontSize="25px" onClick={refreshFriendList} />
          </PopoverHeader>
          {teamState.isPersonal &&
            friendInfo?.map((friend) => (
              <Member
                key={friend.id}
                memberId={friend.id}
                memberName={friend.name}
                status={friend.status}
                isFriend={true}
              />
            ))}
          {!teamState.isPersonal &&
            teamMemberInfo?.map((member) => (
              <Member
                key={member.userId}
                memberId={member.userId}
                memberName={member.memberName}
                status={member.status}
                isFriend={false}
              />
            ))}
          {teamState.isPersonal && <AddNewFriendButton friends={friendInfo} />}
        </CustomPopover>
      }
    >
      <MenuButton>
        <BsFillPeopleFill /> 멤버
      </MenuButton>
    </OverlayTrigger>
  );
}

export default Members;

const CustomPopover = styled(Popover)`
  position: relative;
  z-index: 0;
  min-width: 200px;
`;

const PopoverHeader = styled(Popover.Header)`
  display: flex;
  justify-content: space-between;
`;

const RefreshIcon = styled(GrFormRefresh)`
  &:hover {
    cursor: pointer;
  }
`;