// 라우팅을 위한 useNavigate 훅과 커스텀 훅인 useFetch를 불러옵니다.
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

// CreateDay 컴포넌트는 새로운 Day를 추가하는 기능을 담당합니다.
export default function CreateDay() {
  // useFetch 훅을 사용하여 현재 day 목록을 가져옵니다.
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

  // "Day 삭제" 버튼 클릭 시 호출되는 함수입니다.
  function delDay() {
    // 사용자에게 삭제 여부를 확인합니다.
    if (window.confirm("삭제 하시겠습니까?")) {
      // 가장 마지막 day를 서버에서 삭제합니다. (DELETE 요청)
      fetch(`http://localhost:3001/days/${days.length}`, {
        method: "DELETE",
      }).then((res) => {
        // 요청이 성공적으로 완료되면
        if (res.ok) {
          // 메인 페이지로 이동합니다.
          navigate(`/`);
        }
      });
    }
  }

  return (
    <div>
      <h3>현재 일수 : {days.length}일</h3>
      <button onClick={addDay}>Day 추가</button>
      <button onClick={delDay} className="btn_del">
        Day 삭제
      </button>
    </div>
  );
}
