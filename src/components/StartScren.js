export default function StartScren({ result, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the react Quiz! </h2>
      <h3>{result} : questions to test your memory</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}
