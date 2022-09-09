export default function InfoBox(diaryAnalysis) {
  return (
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
  );
}
