export default function FinishScreen({ points, totalPoints, dispatch }) {
  const percentage = (points / totalPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇🥇🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎖";
  if (percentage >= 50 && percentage < 80) emoji = "🥈🥈";
  if (percentage >= 0 && percentage < 50) emoji = "🏅";
  return (
    <>
      <p className="result">
        You Scored <strong>{points}</strong>/{totalPoints} with{" "}
        <strong>{percentage.toFixed(2)}</strong>%{emoji}
      </p>{" "}
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Reset Quiz
      </button>
    </>
  );
}
