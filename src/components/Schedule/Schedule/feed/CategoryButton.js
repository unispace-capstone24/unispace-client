import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import add from "../images/feedAddButton.png";
import box from "../images/openBox.png";
import { editingState } from "../stores/editing";

const CategoryButton = ({ category }) => {
  const setEditing = useSetRecoilState(editingState);
  return (
    <Wrapper>
      <div>
        <Inner color={category.color}>
          <img src={box} alt="Category box" />
          <div>{category.label}</div>
          <button onClick={() => setEditing(category.label)}>
            <img src={add} alt="Add" />
          </button>
        </Inner>
      </div>
    </Wrapper>
  );
};

export default CategoryButton;

const Wrapper = styled.div`
  & > div {
    display: inline-block;
    height: 36px;
    border-radius: 4px;
    margin: 6px 0;
    background-color: ${({ theme }) => theme.palette.mono.gray_f5};
    border: 1px solid ${({ theme }) => theme.palette.mono.gray_f0};
  }
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 8px;

  & > img {
    width: 22px;
    height: 22px;
    display: block;
    margin: 0 auto;
  }

  button {
    display: flex;
    align-items: center;
    width: 18px;
    height: 18px;
    border: 0;
    justify-content: flex-end;
    background-color: #f5f5f5;

    & > img {
      width: 18px;
      height: 18px;
    }
  }

  div {
    font-weight: 800;
    font-size: 15px;
    padding: 0 8px;
    color: ${({ color }) => color};
  }
`;
