// React와 ReactDOM 라이브러리를 불러옵니다.
import React from "react";
import ReactDOM from "react-dom/client";
// 전역 CSS 파일을 불러옵니다.
import "./index.css";
// 메인 애플리케이션 컴포넌트를 불러옵니다.
import App from "./App";

// public/index.html 파일에 있는 'root'라는 id를 가진 DOM 요소를 찾습니다.
// 이 요소가 React 애플리케이션이 렌더링될 컨테이너입니다.
const root = ReactDOM.createRoot(document.getElementById("root"));

// React 애플리케이션을 렌더링합니다.
// React.StrictMode는 잠재적인 문제를 감지하고 경고를 표시하는 개발용 도구입니다.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
