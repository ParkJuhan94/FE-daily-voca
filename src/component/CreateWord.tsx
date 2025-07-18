// React와 훅들을 불러옵니다.
import React, { useRef, useState } from "react";
// react-router-dom에서 useNavigate 훅을 불러옵니다.
import { useNavigate } from "react-router-dom";
// 커스텀 훅과 인터페이스를 불러옵니다.
import useFetch from "../hooks/useFetch";
import { IDay } from "./DayList";

export default function CreateWord() {
  // useFetch 훅으로 날짜 목록을 가져옵니다.
  const days: IDay[] = useFetch("http://localhost:3001/days");
  // useNavigate 훅을 사용하여 페이지 이동 함수를 가져옵니다.
  const navigate = useNavigate();
  // 로딩 상태를 관리합니다.
  const [isLoading, setIsLoading] = useState(false);

  // 폼 제출 시 호출되는 함수입니다.
  function onSubmit(e: React.FormEvent) {
    e.preventDefault(); // 기본 폼 제출 동작을 막습니다.

    // 로딩 중이 아니고, 모든 입력 필드가 채워져 있을 때
    if (!isLoading && dayRef.current && engRef.current && korRef.current) {
      setIsLoading(true); // 로딩 상태로 변경

      // 입력된 값들을 가져옵니다.
      const day = dayRef.current.value;
      const eng = engRef.current.value;
      const kor = korRef.current.value;

      // API에 POST 요청을 보내 새로운 단어를 추가합니다.
      fetch(`http://localhost:3001/words/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day,
          eng,
          kor,
          isDone: false,
        }),
      }).then(res => {
        if (res.ok) {
          alert("생성이 완료 되었습니다");
          navigate(`/day/${day}`); // 해당 날짜 페이지로 이동
          setIsLoading(false); // 로딩 상태 해제
        }
      });
    }
  }

  // useRef 훅을 사용하여 각 input 요소에 접근합니다.
  const engRef = useRef<HTMLInputElement>(null);
  const korRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLSelectElement>(null);

  return (
    <form onSubmit={onSubmit}>
      <div className="input_area">
        <label>Eng</label>
        <input type="text" placeholder="computer" ref={engRef} />
      </div>
      <div className="input_area">
        <label>Kor</label>
        <input type="text" placeholder="컴퓨터" ref={korRef} />
      </div>
      <div className="input_area">
        <label>Day</label>
        <select ref={dayRef}>
          {days.map(day => (
            <option key={day.id} value={day.day}>
              {day.day}
            </option>
          ))}
        </select>
      </div>
      <button
        style={{
          opacity: isLoading ? 0.3 : 1,
        }}
      >
        {isLoading ? "Saving..." : "저장"}
      </button>
    </form>
  );
}
