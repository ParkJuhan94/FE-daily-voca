import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export interface IDay {
  id: number;
  day: number;
}

export default function DayList() {  
  const days: IDay[] = useFetch("http://localhost:3001/days");

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
