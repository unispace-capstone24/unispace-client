import styled from "styled-components";

function UserName({ name }) {
  return (
    <UsernameH5 className="username">
      {name || "이름 없음"} {/* name이 null일 경우 '이름 없음'을 표시 */}
    </UsernameH5>
  );
}

export default UserName;

const UsernameH5 = styled.div`
  text-align: center;
  font-size: 30px;
  margin: 20px 0;
`;
