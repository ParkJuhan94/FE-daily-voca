// React와 ReactDOM 라이브러리를 불러옵니다.
import React from "react";
import ReactDOM from "react-dom/client";
// 전역 CSS 파일을 불러옵니다.
import "./index.css";
// 메인 애플리케이션 컴포넌트를 불러옵니다.
import App from "./App";
// 웹 퍼포먼스 측정을 위한 함수를 불러옵니다.
import reportWebVitals from "./reportWebVitals";

// public/index.html 파일에 있는 'root'라는 id를 가진 DOM 요소를 찾습니다.
// 이 요소가 React 애플리케이션이 렌더링될 컨테이너입니다.
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// React 애플리케이션을 렌더링합니다.
// React.StrictMode는 잠재적인 문제를 감지하고 경고를 표시하는 개발용 도구입니다.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 웹 퍼포먼스 측정을 시작하려면, 결과를 로깅하는 함수(예: reportWebVitals(console.log))를 전달하거나
// 분석 엔드포인트로 전송하세요. 자세한 정보는 https://bit.ly/CRA-vitals 에서 확인할 수 있습니다.
reportWebVitals();
