import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { IDay } from "./DayList";

export default function CreateWord() {
  const days: IDay[] = useFetch("http://localhost:3001/days");
  // useNavigate 훅을 사용하여 페이지 이동 함수를 초기화합니다.
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // 폼 제출(onSubmit) 이벤트를 처리하는 함수입니다.
  function onSubmit(e: React.FormEvent) {
    // form의 기본 동작(페이지 새로고침)을 막습니다.
    e.preventDefault();

    // 로딩 중이 아닐 때만 단어 생성을 처리합니다.
    if (!isLoading && dayRef.current && engRef.current && korRef.current) {
      // 로딩 상태를 true로 변경하여 중복 제출을 방지합니다.
      setIsLoading(true);

      // 각 ref에서 현재 입력된 값을 가져옵니다.
      const day = dayRef.current.value;
      const eng = engRef.current.value;
      const kor = korRef.current.value;

      // fetch API를 사용하여 서버에 새로운 단어를 추가합니다. (POST 요청)
      fetch(`http://localhost:3001/words/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day,
          eng,
          kor,
          isDone: false, // 처음 생성된 단어는 '미완료' 상태입니다.
        }),
      }).then(res => {
        // 요청이 성공적으로 완료되면
        if (res.ok) {
          alert("생성이 완료 되었습니다");
          // 해당 Day 페이지로 이동합니다.
          navigate(`/day/${day}`);
          // 로딩 상태를 다시 false로 변경합니다.
          setIsLoading(false);
        }
      });
    }
  }

  // useRef를 사용하여 각 DOM 요소(input, select)에 직접 접근합니다.
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
          {/* 서버에서 가져온 Day 목록을 순회하며 option 태그를 생성합니다. */}
          {days.map(day => (
            <option key={day.id} value={day.day}>
              {day.day}
            </option>
          ))}
        </select>
      </div>
      <button
        style={{
          // 로딩 중일 때는 버튼을 반투명하게 만들어 비활성화된 것처럼 보입니다.
          opacity: isLoading ? 0.3 : 1,
        }}
      >
        {/* 로딩 상태에 따라 버튼 텍스트를 "Saving..." 또는 "저장"으로 표시합니다. */}
        {isLoading ? "Saving..." : "저장"}
      </button>
    </form>
  );
}
