import Day from "./component/Day";
import DayList from "./component/DayList";
import Header from "./component/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmptyPage from "./component/EmptyPage";
import CreateWord from "./component/CreateWord";
import CreateDay from "./component/CreateDay";

function App() {
  return (
    // BrowserRouter는 웹 애플리케이션에서 HTML5의 history API를 사용하여 URL과 UI를 동기화하는 라우터입니다.
    <BrowserRouter>
      <div className="App">        
        <Header />
        {/* Routes는 여러 Route들을 감싸서 현재 URL에 맞는 첫 번째 Route를 렌더링합니다. */}
        <Routes>          
          <Route path="/" element={<DayList />} />
          {/* ":day"는 동적 파라미터를 의미하며, Day 컴포넌트에 day라는 이름으로 값을 전달합니다. */}
          <Route path="/day/:day" element={<Day />} />          
          <Route path="/create_word" element={<CreateWord />} />          
          <Route path="/create_day" element={<CreateDay />} />
          <Route path="*" element={<EmptyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
