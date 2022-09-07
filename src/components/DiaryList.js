import DiaryItem from "./DiaryItem";

export default function DiaryList({ diaryList, deleteDiary, modifyDiary }) {
  const total = diaryList.length; // 배열의 갯수
  return (
    <>
      <div className="diaryList">
        <div className="container">
          <div className="titleBox">
            <h2>diary list</h2>
            <p className="total">{total}개의 일기가 있습니다.</p>
          </div>
          <ul className="list">
            {/* dummy를 받아서 반복문 돌리기 */}
            {diaryList.map((item, idx) => {
              // return <DiaryItem key={idx} diaryInfo={item} />;
              return <DiaryItem key={idx} {...item} deleteDiary={deleteDiary} modifyDiary={modifyDiary} />;
              // writer='...' emotion="..."으로 흩뿌려진다.
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
