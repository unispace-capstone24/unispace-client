import dayjs from "dayjs";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import left from "../images/calenderLeft.png";
import right from "../images/calenderRight.png";
import renderCalendarBoard from "./RenderCalendarBoard";
import selectedDateState from "../stores/selectedDate";
import selectedProfileState from "../stores/selectedProfile";

const days = ["일", "월", "화", "수", "목", "금", "토"];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const selectedProfile = useRecoilValue(selectedProfileState);
  const splited = selectedDate.split("/");

  const handleSelectDate = (v) => {
    setSelectedDate(v);
  };
  
  const handlePrevMonth = () => {
    const newDate = dayjs(selectedDate)
      .subtract(1, "month")
      .endOf("month")
      .format("MM/DD/YY");
    setSelectedDate(newDate);
  };
  
  const handleNextMonth = () => {
    const newDate = dayjs(selectedDate)
      .add(1, "month")
      .startOf("month")
      .format("MM/DD/YY");
    setSelectedDate(newDate);
  };

  const board = renderCalendarBoard(selectedDate, selectedProfile, handleSelectDate);

  return (
    <Wrapper>
      <Head>
        <p>
          20{splited[2]}년 {splited[0]}월
        </p>
        <div>
          <img src={left} onClick={handlePrevMonth} alt="Previous Month" />
          <img src={right} onClick={handleNextMonth} alt="Next Month" />
        </div>
      </Head>
      <Days>
        {days.map((v) => (
          <div key={v}>{v}</div>
        ))}
      </Days>
      <Board>{board}</Board>
    </Wrapper>
  );
};

export default Calendar;

const Wrapper = styled.div`
  margin-top: 16px;
  transform: translate3d(-14px, 0, 0);
  width: calc(100% + 28px);
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const Head = styled.div`
  font-size: 14px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  margin: auto 14px;
  margin-bottom: 10px;

  p {
    line-height: 28px;
  }

  img {
    width: 26px;
    margin-left: 8px;
    cursor: pointer;
  }
`;

const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  & > div {
    margin: 4px auto;
    font-size: 15px;
  }
`;
