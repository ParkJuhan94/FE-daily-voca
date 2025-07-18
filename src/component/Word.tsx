// React에서 useState 훅을 불러옵니다. 이 훅은 컴포넌트의 상태를 관리하는 데 사용됩니다.
import { useState } from "react";

// Word 컴포넌트가 받는 props의 타입을 정의하는 인터페이스입니다.
interface IProps {
  word: IWord;
}

// 단어 데이터의 타입을 정의하는 인터페이스입니다.
export interface IWord {
  day: string;
  eng: string;
  kor: string;
  isDone: boolean;
  id: number;
}

export default function Word({ word: w }: IProps) {
  // useState 훅을 사용하여 컴포넌트의 상태를 관리합니다.
  const [word, setWord] = useState(w); // 단어 정보
  const [isShow, setIsShow] = useState(false); // 뜻 보기/숨기기 상태
  const [isDone, setIsDone] = useState(word.isDone); // 완료 여부 상태

  // 뜻 보기/숨기기 상태를 토글하는 함수입니다.
  function toggleShow() {
    setIsShow(!isShow);
  }

  // 완료 여부 상태를 토글하고, API에 PUT 요청을 보내 서버의 데이터를 업데이트합니다.
  function toggleDone() {
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...word,
        isDone: !isDone,
      }),
    }).then(res => {
      if (res.ok) {
        setIsDone(!isDone);
      }
    });
  }

  // 단어를 삭제하는 함수입니다. API에 DELETE 요청을 보냅니다.
  function del() {
    if (window.confirm("삭제 하시겠습니까?")) {
      fetch(`http://localhost:3001/words/${word.id}`, {
        method: "DELETE",
      }).then(res => {
        if (res.ok) {
          // 단어의 id를 0으로 설정하여 화면에서 보이지 않도록 합니다.
          setWord({
            ...word,
            id: 0,
          });
        }
      });
    }
  }

  // 단어가 삭제되었으면 null을 반환하여 렌더링하지 않습니다.
  if (word.id === 0) {
    return null;
  }

  return (
    <tr className={isDone ? "off" : ""}>
      <td>
        <input type="checkbox" checked={isDone} onChange={toggleDone} />
      </td>
      <td>{word.eng}</td>
      <td>{isShow && word.kor}</td>
      <td>
        <button onClick={toggleShow}>뜻 {isShow ? "숨기기" : "보기"}</button>
        <button onClick={del} className="btn_del">
          삭제
        </button>
      </td>
    </tr>
  );
}

// REST API의 기본적인 CRUD(Create, Read, Update, Delete) 메서드입니다.
// Create - POST
// Read - GET
// Update - PUT
// Delete - DELETE
