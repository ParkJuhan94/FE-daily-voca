// react-router-dom에서 useParams 훅을 불러옵니다. 이 훅은 URL의 동적 파라미터 값을 가져오는 데 사용됩니다.
import { useParams } from "react-router-dom";
// useFetch 커스텀 훅을 불러옵니다.
import useFetch from "../hooks/useFetch";
// Word 컴포넌트와 IWord 인터페이스를 불러옵니다.
import Word, { IWord } from "./Word";

export default function Day() {
  // useParams 훅을 사용하여 URL의 ":day" 파라미터 값을 가져옵니다.
  const { day } = useParams<{ day: string }>();
  // useFetch 훅을 사용하여 해당 날짜의 단어 목록을 가져옵니다.
  const words: IWord[] = useFetch(`http://localhost:3001/words?day=${day}`);

  return (
    <>
      <h2>Day {day}</h2>
      {/* 데이터 로딩 중일 때 "Loading..." 메시지를 표시합니다. */}
      {words.length === 0 && <span>Loading...</span>}
      <table>
        <tbody>
          {/* 가져온 단어 목록을 map 함수를 사용하여 순회하며 Word 컴포넌트를 렌더링합니다. */}
          {words.map(word => (
            <Word word={word} key={word.id} />
          ))}
        </tbody>
      </table>
    </>
  );
}
