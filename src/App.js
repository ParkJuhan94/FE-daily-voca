// 필요한 컴포넌트들을 불러옵니다.
import Day from "./component/Day";
import DayList from "./component/DayList";
import Header from "./component/Header";
// react-router-dom에서 라우팅 관련 컴포넌트들을 불러옵니다.
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmptyPage from "./component/EmptyPage";
import CreateWord from "./component/CreateWord";
import CreateDay from "./component/CreateDay";

function App() {
  return (
    // BrowserRouter는 웹 애플리케이션에서 HTML5의 history API를 사용하여 URL과 UI를 동기화하는 라우터입니다.
    <BrowserRouter>
      <div className="App">
        {/* Header 컴포넌트는 모든 페이지에 공통으로 표시됩니다. */}
        <Header />
        {/* Routes는 여러 Route들을 감싸서 현재 URL에 맞는 첫 번째 Route를 렌더링합니다. */}
        <Routes>
          {/* path="/"는 루트 경로를 의미하며, DayList 컴포넌트를 렌더링합니다. */}
          <Route path="/" element={<DayList />} />
          {/* ":day"는 동적 파라미터를 의미하며, Day 컴포넌트에 day라는 이름으로 값을 전달합니다. */}
          <Route path="/day/:day" element={<Day />} />
          {/* "/create_word" 경로에서는 CreateWord 컴포넌트를 렌더링합니다. */}
          <Route path="/create_word" element={<CreateWord />} />
          {/* "/create_day" 경로에서는 CreateDay 컴포넌트를 렌더링합니다. */}
          <Route path="/create_day" element={<CreateDay />} />
          {/* "*"는 위에서 정의된 경로 외의 모든 경로를 의미하며, EmptyPage 컴포넌트를 렌더링합니다. */}
          <Route path="*" element={<EmptyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
