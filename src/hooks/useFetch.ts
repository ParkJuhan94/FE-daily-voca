// React에서 useEffect와 useState 훅을 불러옵니다.
import { useEffect, useState } from "react";

// useFetch라는 이름의 커스텀 훅을 정의합니다. 이 훅은 URL을 인자로 받습니다.
export default function useFetch(url: string) {
  // useState 훅을 사용하여 데이터 상태를 관리합니다.
  const [data, setData] = useState([]);

  // useEffect 훅을 사용하여 컴포넌트가 렌더링될 때 API 요청을 보냅니다.
  // 의존성 배열에 [url]을 전달하여 url이 변경될 때만 useEffect가 다시 실행되도록 합니다.
  useEffect(() => {
    fetch(url)
      .then(res => {
        // 응답을 JSON 형태로 변환합니다.
        return res.json();
      })
      .then(data => {
        // 받아온 데이터로 상태를 업데이트합니다.
        setData(data);
      });
  }, [url]);

  // 가져온 데이터를 반환합니다.
  return data;
}
