import { useRecoilValue, useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { BsUpload } from "react-icons/bs";
import axios from 'axios';
import styled from "styled-components";

import { spaceState, spaceEditedState } from "../Workspace/recoil/SpaceState";

function SaveButton() {
  const params = useParams();

  const space = useRecoilValue(spaceState);
  const [spaceEdited, setSpaceEdited] = useRecoilState(spaceEditedState);

  const spaceUpload = async () => {
    // Title Upload Function
    await axios.patch(`/page/${params.pageId}/title`, {
      title: space.title,
    });

    // Content Upload Function
    await axios.patch(`/page/${params.pageId}/content`, {
      content: space.content,
    });

    setSpaceEdited(false);

    window.location.reload();
  };

  return (
    <SaveButtonWrapper onClick={spaceUpload} isEdited={spaceEdited}>
      <BsUpload /> Save
    </SaveButtonWrapper>
  );
}

export default SaveButton;

const SaveButtonWrapper = styled.h3`
  margin: 0;
  padding: 10px;
  background-color: ${(props) => (props.isEdited ? "white" : "whitesmoke")};

  &:hover {
    background-color: whitesmoke;
    cursor: pointer;
  }
`;