import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { Accordion, Modal, Button, Form } from "react-bootstrap";
import { MdOutlineAddBox } from "react-icons/md";
import styled from "styled-components";
import axios from "axios";

import { EndPointCustomH5 } from "./SideMenuBar";
import { userInfoState } from "../../contexts/UserInfoState";

function CreateTeamButton() {
  const navigate = useNavigate();

  const userInfo = useRecoilValue(userInfoState);
  const [createTeamModal, setCreateTeamModal] = useState(false);
  const [teamName, setTeamName] = useState("");

  const teamNameChangeHandler = (event) => {
    setTeamName(event.target.value);
  };

  const createTeamHandler = async () => {
    const token = localStorage.getItem("unispace_token");

    const createTeamRes = await axios.post(
      `/team`,
      {
        memberId: userInfo.id,
        teamName: teamName,
      },
      { headers: { "JWT-Authorization": `Bearer ${token}` } }
    );
    const createdTeamId = createTeamRes.data.teamId;

    const createdTeamSpaceRes = await axios.get(
      `/team/${createdTeamId}/space`,
      {
        headers: { "JWT-Authorization": `Bearer ${token}` },
      }
    );
    const createdTeamInitialPageId =
      createdTeamSpaceRes.data.data.pageList[0].pageId;

    setCreateTeamModal(false);
    navigate(`/space/${createdTeamInitialPageId}`);
  };

  return (
    <div>
      <Accordion.Item eventKey="9998">
        <EndPointCustomH5
          $active={false}
          onClick={() => setCreateTeamModal(true)}
        >
          <MdOutlineAddBox /> 팀 생성
        </EndPointCustomH5>
      </Accordion.Item>
      <Modal
        show={createTeamModal}
        onHide={() => setCreateTeamModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>팀 생성</Modal.Title>
        </Modal.Header>
        <ModalBody>
          <CreateTeamTitleLabel>팀 이름</CreateTeamTitleLabel>
          <Form.Control
            size="lg"
            type="text"
            placeholder="팀 이름을 입력해주세요."
            value={teamName}
            onChange={teamNameChangeHandler}
          />
        </ModalBody>
        <Modal.Footer>
          <Button onClick={createTeamHandler}>Create</Button>
          <Button variant="secondary" onClick={() => setCreateTeamModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateTeamButton;

const ModalBody = styled(Modal.Body)`
  padding: 40px 20px;
`;

const CreateTeamTitleLabel = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
