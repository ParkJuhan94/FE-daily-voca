import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Word, { IWord } from "./Word";

export default function Day() {
  // useParams 훅을 사용하여 URL의 ":day" 파라미터 값을 가져옵니다.
  const { day } = useParams<{ day: string }>();
  const words: IWord[] = useFetch(`http://localhost:3001/words?day=${day}`);
  // const []
  const navigate = useNavigate();

  function del() {
    if (window.confirm("삭제 하시겠습니까?")) {
      const wordDeletePromises = words.map(word =>
        fetch(`http://localhost:3001/words/${word.id}`, {
          method: "DELETE",
        })
      );

      Promise.all(wordDeletePromises)
        .then(() => {
          fetch(`http://localhost:3001/days/${day}`, {
            method: "DELETE",
          }).then((res) => {
            if (res.ok) {
              alert("삭제되었습니다.");
              navigate("/");
            }
          });
        })
        .catch(err => {
          console.error("Word deletion failed", err);
          alert("단어 삭제 중 오류가 발생했습니다.");
        });
    }
  }

  return (
    <>
      <h2>Day {day}</h2>
      <div style={{ marginBottom: "50px" }}>
        <button onClick={del} className="btn_del">
          Day 삭제
        </button>
      </div>
      {/* 데이터 로딩 중일 때 "Loading..." 메시지를 표시합니다. */}
      {words.length === 0 && <span>Loading...</span>}
      <table>
        <tbody>
          {/* 가져온 단어 목록을 map 함수를 사용하여 순회하며 Word 컴포넌트를 렌더링합니다. */}
          {words.map((word) => (
            <Word word={word} key={word.id} />
          ))}
        </tbody>
      </table>
    </>
  );
}
