import { useRecoilValue } from "recoil";
import { Accordion } from "react-bootstrap";
import styled from "styled-components";

import UserName from "./UserName";
import PersonalSpaceNavigator from "./PersonalSpaceNavigator";
import TeamSpaceNavigator from "./TeamSpaceNavigator";
import CreateTeamButton from "./CreateTeamButton";
import JoinTeamButton from "./JoinTeamButton";
import { userInfoState } from "../../contexts/UserInfoState";

function SideMenuBar() {
  const userInfo = useRecoilValue(userInfoState);

  return (
    <SideMenuBarWrapper>
      <UserName name={userInfo.name} />
      <Accordion alwaysOpen flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <CustomH5>Personal Space</CustomH5>
          </Accordion.Header>
          <NestedAccordionBody>
            <PersonalSpaceNavigator userId={userInfo.id} />
          </NestedAccordionBody>
        </Accordion.Item>
        {userInfo.teamList.map((team) => {
          return (
            <TeamSpaceNavigator
              key={team.teamId}
              teamId={team.teamId}
              teamName={team.teamName}
            />
          );
        })}
        <CreateTeamButton />
        <JoinTeamButton />
      </Accordion>
    </SideMenuBarWrapper>
  );
}

export default SideMenuBar;

const SideMenuBarWrapper = styled.div`
  background-color: #f7f7f5;
`;

export const CustomH5 = styled.h5`
  margin: 0;
`;

export const EndPointCustomH5 = styled.h5`
  margin: 0;
  padding: 16px 20px;

  background-color: ${(props) => (props.$active ? "whitesmoke" : "white")};

  &:hover {
    background-color: whitesmoke;
    transition: 0.5s;
    cursor: pointer;
  }
`;

export const NestedAccordionBody = styled(Accordion.Body)`
  padding: 0 0 0 25px;
`;

export const NestedAccordionItem = styled(Accordion.Item)`
  padding: 0;
`;
