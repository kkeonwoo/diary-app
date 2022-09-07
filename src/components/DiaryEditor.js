import { useState, useRef } from "react";
export default function DiaryEditor({ insertDiary }) {
  const writerRef = useRef();
  const contentsRef = useRef();
  const emotionRef = useRef();
  // const [writer, setWriter] = useState("");
  // const [contents, setContents] = useState("");
  // const [emotion, setEmotion] = useState(1);
  // obj = {name:"이건우",age:22,wieght:70}
  const [diaryItem, setDiaryItem] = useState({
    writer: "",
    contents: "",
    emotion: 1,
  });
  const insertDiaryItem = function () {
    // console.log(diaryItem.writer);
    // console.log(diaryItem.contents);
    // console.log(diaryItem.emotion);
    if (diaryItem.writer.length < 3) {
      alert("글쓴이는 최소 3글자 이상이어야 합니다.");
      writerRef.current.focus();
      return false;
    } else if (diaryItem.contents.length < 10) {
      alert("내용은 최소 10글자 이상이어야 합니다.");
      contentsRef.current.focus();
      return false;
    }
    // 자식이 부모한테 데이터 전달하는 방법...
    // 부모에서 만든 함수를 받아서 자식이 호출해서 사용
    insertDiary(diaryItem.writer, diaryItem.contents, diaryItem.emotion);
    alert("저장되었습니다.");
    setDiaryItem({
      writer: "",
      contents: "",
      emotion: 1,
    });
  };
  const changeDiaryItem = function (e) {
    console.log(e.target.name);
    // 스프레드 연산자 ...
    // 객체는 참조를 하지만 스프레드 연산자로 흩뿌리면 복제를 한다.
    // 따라서 스프레드 연산자는 객체의 value를 변경해도 원래 객체의 value를 변경시키지 않는다.
    setDiaryItem({
      ...diaryItem, // 그래서 흩뿌리고
      [e.target.name]: e.target.value, // 필요한 key,value 변경
    });
  };
  // const changeWriter = function (e) {
  //   setWriter(e.target.value);
  //   // console.log(e.target.value);
  // };
  // const changeContents = function (e) {
  //   setContents(e.target.value);
  //   // console.log(e.target.value);
  // };
  // const changeEmotion = function (e) {
  //   setEmotion(e.target.value);
  //   // console.log(e.target.value);
  // };
  return (
    <div className="container">
      <div className="inputBox">
        <input type="text" name="writer" value={diaryItem.writer} placeholder="이름을 입력해주세요.😊" onChange={changeDiaryItem} ref={writerRef} />
      </div>
      <div className="contents">
        <textarea name="contents" id="" cols="30" rows="10" value={diaryItem.contents} placeholder="내용을 입력해주세요." onChange={changeDiaryItem} ref={contentsRef}></textarea>
      </div>
      <div className="section">
        <label>오늘 하루는 어땠나요?🤷</label>
        <select name="emotion" id="" value={diaryItem.emotion} onChange={changeDiaryItem} ref={emotionRef}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        {/* <label>
          <span>나빠요</span>
          <input type="radio" name="emotion" id="" value="1" />
        </label>
        <label>
          <span>좋아요</span>
          <input type="radio" name="emotion" id="" value="2" />
        </label>
        <label>
          <span>감동이예요</span>
          <input type="radio" name="emotion" id="" value="3" />
        </label>
        <label>
          <span>화나요</span>
          <input type="radio" name="emotion" id="" value="4" />
        </label>
        <label>
          <span>놀라워요</span>
          <input type="radio" name="emotion" id="" value="5" />
        </label> */}
      </div>
      <div className="btns section">
        <button className="btn btnSave" onClick={insertDiaryItem}>
          💾
        </button>
      </div>
    </div>
  );
}
