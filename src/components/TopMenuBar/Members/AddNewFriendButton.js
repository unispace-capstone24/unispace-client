import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Card, Modal, Button, Form } from "react-bootstrap";
import { MdOutlineAddBox } from "react-icons/md";
import styled from "styled-components";
import axios from "axios";

import { SearchBarWrapper } from "../../SideMenuBar/JoinTeamButton";
import { userInfoState } from "../../../contexts/UserInfoState";

function AddNewFriendButton(props) {
  const userInfo = useRecoilValue(userInfoState);
  const [addFriendModal, setAddFriendModal] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [myFriendIdList, setMyFriendIdList] = useState(
    props.friends?.map((friend) => friend.id)
  );

  const openModal = () => {
    setAddFriendModal(true);
  };

  const closeModal = () => {
    setAddFriendModal(false);
    setFriendName("");
    setFriendList([]);
  };

  const friendNameChangeHandler = (event) => {
    setFriendName(event.target.value);
  };

  const searchFriendHandler = async () => {
    const token = localStorage.getItem("unispace_token");
    const response = await axios.get(`/member/name`, {
      params: { memberName: friendName },
      headers: { "JWT-Authorization": `Bearer ${token}` },
    });

    const searchedFriendList = response.data.data;
    setMyFriendIdList([...myFriendIdList, userInfo.id]);
    setFriendList(searchedFriendList);
  };

  const addFriendHandler = async (friendId) => {
    const token = localStorage.getItem("unispace_token");
    await axios.post(
      `/${userInfo.id}/friend`,
      {
        friendId: friendId,
      },
      { headers: { "JWT-Authorization": `Bearer ${token}` } }
    );
    window.location.reload();
  };

  return (
    <div style={{ position: "relative", zIndex: "9999999999" }}>
      <AddFriendButton body onClick={openModal}>
        <MdOutlineAddBox /> 친구 추가
      </AddFriendButton>
      <Modal
        show={addFriendModal}
        onHide={closeModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>친구 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SearchBarWrapper>
            <Form.Control
              size="lg"
              type="text"
              placeholder="친구 이름을 입력해주세요."
              value={friendName}
              onChange={friendNameChangeHandler}
            />
            <Button className="search-button" onClick={searchFriendHandler}>
              검색
            </Button>
          </SearchBarWrapper>
          <FriendListWrapper>
            {friendList &&
              friendList.map((friend) => {
                let isDup = false;
                myFriendIdList?.forEach((id) => {
                  if (id === friend.memberId) isDup = true;
                });
                return (
                  <FriendCard body key={friend.memberId}>
                    <FriendCardContentWrapper>
                      <span className="name">{friend.memberName}</span>
                      <Button
                        onClick={() => addFriendHandler(friend.memberId)}
                        disabled={isDup}
                      >
                        추가
                      </Button>
                    </FriendCardContentWrapper>
                  </FriendCard>
                );
              })}
          </FriendListWrapper>
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

export default AddNewFriendButton;

const AddFriendButton = styled(Card)`
  text-align: center;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #f7f7f5;
    transition: 0.5s;
  }
`;

const FriendListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  margin: 10px 0;
  overflow: scroll;
`;

const FriendCard = styled(Card)`
  margin: 2.5px 0;
`;

const FriendCardContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .name {
    font-size: 20px;
  }
`;
