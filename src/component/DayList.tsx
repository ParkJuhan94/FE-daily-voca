// react-router-dom에서 Link 컴포넌트를 불러옵니다. Link는 페이지를 새로고침하지 않고 다른 경로로 이동할 수 있게 해줍니다.
import { Link } from "react-router-dom";
// useFetch 커스텀 훅을 불러옵니다. 이 훅은 API로부터 데이터를 가져오는 역할을 합니다.
import useFetch from "../hooks/useFetch";

// Day 데이터의 타입을 정의하는 인터페이스입니다.
export interface IDay {
  id: number;
  day: number;
}

export default function DayList() {
  // useFetch 훅을 사용하여 "http://localhost:3001/days" 주소에서 날짜 목록을 가져옵니다.
  const days: IDay[] = useFetch("http://localhost:3001/days");

  // 데이터 로딩 중일 때 "Loading..." 메시지를 표시합니다.
  if (days.length === 0) {
    return <span>Loading...</span>;
  }

  return (
    <ul className="list_day">
      {/* 가져온 날짜 목록을 map 함수를 사용하여 순회하며 각 날짜에 대한 링크를 생성합니다. */}
      {days.map(day => (
        <li key={day.id}>
          {/* Link 컴포넌트를 사용하여 클릭 시 "/day/{day.day}" 경로로 이동하도록 설정합니다. */}
          <Link to={`/day/${day.day}`}>Day {day.day}</Link>
        </li>
      ))}
    </ul>
  );
}
