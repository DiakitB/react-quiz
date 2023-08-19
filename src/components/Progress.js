export default function Progress({
  index,
  result,
  points,
  totalPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress max={result} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1} </strong> /{result}
      </p>
      <p>
        <strong>{points}</strong>/ {totalPoints}
      </p>
    </header>
  );
}
