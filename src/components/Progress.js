function Progress({ numResult, index, points, totalPoints }) {
  console.log(points);
  return (
    <header className="progress">
      <progress max={numResult} value={index} />
      <p>
        Question {index}/{numResult}
      </p>
      <p>
        <strong>
          {points}/{totalPoints}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
