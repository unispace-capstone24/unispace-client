import { OverlayTrigger, Popover } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";

import { MenuButton } from "./TopMenuBar";

function Search() {
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={
        <Popover>
          <Popover.Body>Search Test Popover</Popover.Body>
        </Popover>
      }
    >
      <MenuButton>
        <AiOutlineSearch /> 검색
      </MenuButton>
    </OverlayTrigger>
  );
}

export default Search;
