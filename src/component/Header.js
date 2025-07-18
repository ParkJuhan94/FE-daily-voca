// react-router-dom에서 Link 컴포넌트를 불러옵니다.
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <h1>
        {/* 로고를 클릭하면 메인 페이지로 이동합니다. */}
        <Link to="/">토익 영단어(고급)</Link>
      </h1>
      <div className="menu">
        {/* "단어 추가" 링크를 클릭하면 "/create_word" 경로로 이동합니다. */}
        <Link to="/create_word" className="link">
          단어 추가
        </Link>
        {/* "Day 추가" 링크를 클릭하면 "/create_day" 경로로 이동합니다. */}
        <Link to="/create_day" className="link">
          Day 추가
        </Link>
      </div>
    </div>
  );
}
