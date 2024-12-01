import { Link } from "react-router-dom";

const ids = Array(8)
  .fill(1)
  .map((n, i) => n + i);

function RootNavigator() {
  return (
    <div>
      <h1>테스트 ID 선택</h1>
      <p>선택하면 /:id/space로 이동</p>
      {ids.map((id) => {
        return (
          <div
            style={{
              width: "100px",
              textAlign: "center",
              backgroundColor: "lightblue",
              margin: "10px",
            }}
            key={id}
          >
            <Link to={`/space/${id}`}>{id}</Link>
          </div>
        );
      })}
    </div>
  );
}

export default RootNavigator;
