import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const CategoryColorModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={openModal}>카테고리 색상 설정</Button>
      <ColorModal isOpen={isOpen} onRequestClose={closeModal}>
        <ModalTitle>카테고리 색상 설정</ModalTitle>
        <ButtonWrapper>
          <CancelButton onClick={closeModal}>취소</CancelButton>
          <SaveButton>저장</SaveButton>
        </ButtonWrapper>

        <ColorList>
          <ColorItem color="#ffcac9" />
          <ColorItem color="#fcb7a3" />
          <ColorItem color="#f6b0b6" />
          <ColorItem color="#e57a72" />
          <ColorItem color="#ff5c55" />
          <ColorItem color="#CCFFFF" />
          <ColorItem color='#CCEEFF' />
          <ColorItem color='#CCCCFF' />
          <ColorItem color='#CCBBFF' />
          <ColorItem color='#CCAAFF' />
          <ColorItem color='#D1FFD8' />
          <ColorItem color='#C1F0B4' />
          <ColorItem color='#90D48D' />
          <ColorItem color='#b6cfb6' />
          <ColorItem color='#A1AC80' />
          {/* 추가적인 색상 아이템들 */}
        </ColorList>
      </ColorModal>
    </>
  );
};

const Button = styled.button`
  padding: 8px;
  background-color: #f9f9f9;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ColorModal = styled(Modal)`
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 16px;
`;

const ColorList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin-bottom: 16px;
`;

const ColorItem = styled.li`
  width: 30px;
  height: 30px;
  background-color: ${props => props.color};
  border-radius: 50%;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  padding: 8px;
  margin-right: 8px;
  background-color: #f9f9f9;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SaveButton = styled.button`
  padding: 8px;
  background-color: #f9f9f9;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default CategoryColorModal;
