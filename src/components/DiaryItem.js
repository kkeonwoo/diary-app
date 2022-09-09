import { useState, useRef } from "react";

export default function DiaryItem({ writer, emotion, contents, date, id, deleteDiary, modifyDiary }) {
  // 흩뿌린 걸 개별적으로 받아서 사용할 수 있다.
  const [isEdit, setIsEdit] = useState(false);
  const [isActive, setActive] = useState("false");
  const ToggleClass = () => {
    setActive(!isActive);
  };
  const [localContents, setLocalContents] = useState(contents);
  const [localEmotion, setLocalEmotion] = useState(emotion);
  const contentsRef = useRef();
  return (
    <li className={isActive ? "diaryItem on" : "diaryItem"}>
      <div className="btns">
        <button className="btn" onClick={ToggleClass}></button>
      </div>
      <div className="info">
        <dl>
          <dt>글쓴이</dt>
          <dd>{writer}</dd>
        </dl>
        <dl>
          <dt>오늘의 기분</dt>
          <dd>
            {isEdit ? (
              <select
                value={emotion}
                onChange={(e) => {
                  setLocalEmotion(e.target.value);
                }}
              >
                <option value="1">나빠요</option>
                <option value="2">슬퍼요</option>
                <option value="3">좋아요</option>
                <option value="4">놀라워요</option>
                <option value="5">행복해요</option>
              </select>
            ) : (
              emotion
            )}
          </dd>
        </dl>
        <dl>
          <dt>날짜</dt>
          <dd>{new Date(date).toLocaleString()}</dd>
          {/* toLocaleString -> 나라에 맞는 날짜를 띄워준다. */}
        </dl>
        <div className="btns">
          {isEdit ? (
            <>
              <button
                className="btn"
                onClick={() => {
                  if (localContents.length < 10) {
                    alert("일기내용은 10글자 이상이어야합니다.");
                    contentsRef.current.focus();
                    return;
                  }
                  modifyDiary(id, localContents, localEmotion);
                  setIsEdit(false);
                }}
              >
                <span className="material-icons">done</span>
              </button>
              <button
                className="btn"
                onClick={() => {
                  setIsEdit(false);
                }}
              >
                <span className="material-icons">close</span>
              </button>
            </>
          ) : (
            <>
              <button
                className="btn"
                onClick={() => {
                  setIsEdit(true);
                  setLocalContents(contents);
                }}
              >
                <span className="material-icons">edit</span>
              </button>
              <button
                className="btn"
                onClick={() => {
                  if (window.confirm(`${id + 1}번째 다이어리를 지우겠습니까?`)) {
                    deleteDiary(id);
                  }
                }}
              >
                <span className="material-icons">delete</span>
              </button>
            </>
          )}
        </div>
      </div>
      {isEdit ? (
        <>
          <textarea
            ref={contentsRef}
            value={localContents}
            onChange={(e) => {
              setLocalContents(e.target.value);
            }}
          ></textarea>
        </>
      ) : (
        <div className="contents">{contents}</div>
      )}
    </li>
  );
}
