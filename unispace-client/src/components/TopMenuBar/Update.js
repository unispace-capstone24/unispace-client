import { OverlayTrigger, Popover } from "react-bootstrap";
import { GrUpdate } from "react-icons/gr";

import { MenuButton } from "./TopMenuBar";

function Update() {
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={
        <Popover>
          <Popover.Body>Update Test Popover</Popover.Body>
        </Popover>
      }
    >
      <MenuButton>
        <GrUpdate /> 업데이트
      </MenuButton>
    </OverlayTrigger>
  );
}

export default Update;
