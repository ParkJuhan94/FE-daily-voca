// 라우팅을 위한 useNavigate 훅과 커스텀 훅인 useFetch를 불러옵니다.
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function CreateDay() {
  const days = useFetch("http://localhost:3001/days");
  // 페이지 이동을 위해 useNavigate 훅을 사용합니다.
  const navigate = useNavigate();

  // "Day 추가" 버튼 클릭 시 호출되는 함수입니다.
  function addDay() {
    // fetch API를 사용하여 새로운 day를 서버에 추가합니다. (POST 요청)
    fetch(`http://localhost:3001/days/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // 새로운 day 번호는 현재 day 목록의 길이에 1을 더한 값입니다.
        day: days.length + 1,
      }),
    }).then((res) => {
      // 요청이 성공적으로 완료되면
      if (res.ok) {
        alert("생성이 완료 되었습니다");
        // 메인 페이지로 이동합니다.
        navigate(`/`);
      }
    });
  }

  return (
    <div>
      <h3>현재 일수 : {days.length}일</h3>
      <button onClick={addDay}>Day 추가</button>
    </div>
  );
}
