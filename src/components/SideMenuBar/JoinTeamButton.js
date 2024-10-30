import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { Accordion, Modal, Button, Form, Card } from "react-bootstrap";
import { MdOutlineAddBox } from "react-icons/md";
import styled from "styled-components";
import axios from "axios";

import { EndPointCustomH5 } from "./SideMenuBar";
import { userInfoState } from "../../contexts/UserInfoState";

function JoinTeamButton() {
  const navigate = useNavigate();

  const userInfo = useRecoilValue(userInfoState);
  const [joinTeamModal, setJoinTeamModal] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [searchedTeamList, setSearchedTeamList] = useState([]);

  const closeModal = () => {
    setJoinTeamModal(false);
    setTeamName("");
    setSearchedTeamList([]);
  };

  const teamNameChangeHandler = (event) => {
    setTeamName(event.target.value);
  };

  const searchTeamHandler = async () => {
    const token = localStorage.getItem("withspace_token");
    const response = await axios.get(`/team/name`, {
      params: { teamName: teamName },
      headers: { "JWT-Authorization": `Bearer ${token}` },
    });
    setSearchedTeamList(response.data.data);
  };

  return (
    <div>
      <Accordion.Item eventKey="9999">
        <EndPointCustomH5
          $active={false}
          onClick={() => setJoinTeamModal(true)}
        >
          <MdOutlineAddBox /> 팀 가입
        </EndPointCustomH5>
      </Accordion.Item>
      <Modal
        show={joinTeamModal}
        onHide={closeModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>팀 가입</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <JoinTeamTitleLabel>팀 검색</JoinTeamTitleLabel>
          <SearchBarWrapper>
            <Form.Control
              size="lg"
              type="text"
              placeholder="팀 이름을 입력해주세요."
              value={teamName}
              onChange={teamNameChangeHandler}
            />
            <Button className="search-button" onClick={searchTeamHandler}>
              검색
            </Button>
          </SearchBarWrapper>
          <TeamListWrapper>
            {searchedTeamList &&
              searchedTeamList.map((team) => {
                return (
                  <TeamCard body key={team.teamId}>
                    <TeamCardContentWrapper>
                      {team.teamName}
                      <Button
                        onClick={async () => {
                          const token = localStorage.getItem("withspace_token");

                          const joinTeamRes = await axios.post(
                            `/team/${team.teamId}/members`,
                            {
                              memberId: userInfo.id,
                            },
                            {
                              headers: {
                                "JWT-Authorization": `Bearer ${token}`,
                              },
                            }
                          );
                          const joinedTeamId = joinTeamRes.data.data.teamId;

                          const joinedTeamSpaceRes = await axios.get(
                            `/team/${joinedTeamId}/space`,
                            {
                              headers: {
                                "JWT-Authorization": `Bearer ${token}`,
                              },
                            }
                          );
                          const joinedTeamInitialPageId =
                            joinedTeamSpaceRes.data.data.pageList[0].pageId;

                          closeModal();
                          navigate(`/space/${joinedTeamInitialPageId}`);
                          window.location.reload();
                        }}
                      >
                        가입
                      </Button>
                    </TeamCardContentWrapper>
                  </TeamCard>
                );
              })}
          </TeamListWrapper>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default JoinTeamButton;

const JoinTeamTitleLabel = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
`;

const TeamListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  margin: 10px 0;
  overflow: scroll;
`;

export const SearchBarWrapper = styled.div`
  display: flex;

  .search-button {
    margin-left: 10px;
    width: 75px;
  }
`;

const TeamCard = styled(Card)`
  margin: 2.5px 0;
`;

const TeamCardContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .name {
    font-size: 20px;
  }
`;
