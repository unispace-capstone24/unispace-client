import styled from "styled-components";
import Calendar from "./Schedule/calendar/Calendar";
import Feed from "./Schedule/feed/Feed";

const MyCalendar = () => {
  return (
    <Wrapper>
      <Header></Header>
      <Main>
        <LeftSide>
          <Calendar />
        </LeftSide>
        <Feed />
      </Main>
    </Wrapper>
  );
};

export default MyCalendar;

const Wrapper = styled.div`
  width: 100%;
  min-width: 800px;
  height: 100vh;
`;

const Header = styled.div`
  height: 64px;
  width: 100%;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 346px auto;
  grid-gap: 60px;
  width: 100%;
  padding: 0 48px;
`;

const LeftSide = styled.div`
  margin-top: 24px;
`;
