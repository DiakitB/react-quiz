import { useQuiz } from "../contexts/QuizContext";

function Finish() {
  const { points, totalPoints, dispatch } = useQuiz();
  const percentage = (points / totalPoints) * 100;
  return (
    <>
      <p className="result">
        <strong>You scored </strong>/{points}
        <strong>
          / of/ {totalPoints}/ {Math.ceil(percentage)}%
        </strong>
      </p>
      <button
        className="btn btn-reset"
        onClick={() => dispatch({ type: "restart" })}
      >
        Reset Quiz
      </button>
    </>
  );
}

export default Finish;
