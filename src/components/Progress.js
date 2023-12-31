import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { numResult, index, points, totalPoints } = useQuiz();
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
