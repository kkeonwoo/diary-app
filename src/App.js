import "./App.css";
import "./css/reset.css";
import "./css/layout.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DiaryEditor from "./components/DiaryEditor";
import DiaryList from "./components/DiaryList";
import { useMemo, useRef, useState } from "react";

function App() {
  const dataId = useRef(0);
  // useRef는 화면이 렌더링 되어서 값이 초기화 되는 걸 막고 싶을때
  // 혹은 Dom 제어할 때 사용
  // 한페이지에 입력한 내용이 바로 추가되어 렌더링 되기 위해서
  // 자식이 부모에게 데이터를 전달해야
  const deleteDiary = function (id) {
    console.log("id===", id);
    //여기서 전달 받은 id값만 삭제
    const filteredDiaryData = diaryData.filter((item, idx) => {
      return item.id !== id;
    });
    setDiaryData(filteredDiaryData);
  };
  const insertDiary = function (writer, contents, emotion, id) {
    console.log(writer);
    console.log(contents);
    console.log(emotion);
    const insertDiaryData = {
      writer: writer,
      contents: contents,
      emotion: emotion,
      date: new Date().getTime(),
      id: dataId.current,
    };
    dataId.current += 1;
    setDiaryData([insertDiaryData, ...diaryData]);
    // 기존의 diaryDate를 흩뿌리고 새로운 data를 insert
  };
  const modifyDiary = function (id, localContents, localEmotion) {
    const modifiedDiaryData = diaryData.map((item, idx) => {
      return item.id === id ? { ...item, contents: localContents, emotion: localEmotion } : item;
    });
    setDiaryData(modifiedDiaryData);
  };
  const [diaryData, setDiaryData] = useState([]);
  // const diaryData = [
  //   {
  //     id: 1,
  //     wirter: "이건우",
  //     contents: "날씨 화창",
  //     emotion: 1,
  //     date: 20200906,
  //   },
  //   {
  //     id: 2,
  //     wirter: "지석진",
  //     contents: "날씨 화창",
  //     emotion: 2,
  //     date: 20200906,
  //   },
  //   {
  //     id: 3,
  //     wirter: "이건우",
  //     contents: "날씨 화창",
  //     emotion: 1,
  //     date: 20200906,
  //   },
  //   {
  //     id: 4,
  //     wirter: "이건우",
  //     contents: "날씨 화창",
  //     emotion: 5,
  //     date: 20200906,
  //   },
  //   {
  //     id: 5,
  //     wirter: "이건우",
  //     contents: "날씨 화창",
  //     emotion: 3,
  //     date: 20200906,
  //   },
  // ];

  const diaryAnalysis = useMemo(() => {
    console.log("일기 분석을 시작합니다.");
    const total = diaryData.length;
    const good = diaryData.filter((item, idx) => {
      return item.emotion >= 3;
    }).length;
    const bad = total - good;
    const percent = Math.floor((good / total) * 100 * 100) / 100;
    return {
      good: good,
      bad: bad,
      percent: percent,
      total: total,
    };
  }, [diaryData]);
  //Hook
  //component lifecycle
  // useMemo = 렌더링을 최소화하기 위해서 쓴다.
  return (
    <div className="App">
      <Header />
      <DiaryEditor insertDiary={insertDiary} />
      {/* 함수를 자식한테 전달, 실행은 자식이 */}
      <div className="infoBox container">
        <dl>
          <dt>전체 :</dt>
          <dd>
            <strong>{diaryAnalysis.total}</strong>
          </dd>
        </dl>
        <dl>
          <dt>기분 좋은 날 : </dt>
          <dd>
            <strong>{diaryAnalysis.good}</strong>
          </dd>
        </dl>
        <dl>
          <dt>기분 더러운 날 :</dt>
          <dd>
            <strong>{diaryAnalysis.bad}</strong>
          </dd>
        </dl>
        <dl>
          <dt>퍼센트</dt>
          <dd>
            <strong>{diaryAnalysis.percent}%</strong>
          </dd>
        </dl>
      </div>
      <DiaryList diaryList={diaryData} deleteDiary={deleteDiary} modifyDiary={modifyDiary} />
      {/* 자식한테 dummy를 props로 보내기 */}
      <Footer />
    </div>
  );
}

export default App;
