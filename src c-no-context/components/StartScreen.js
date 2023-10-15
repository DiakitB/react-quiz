function StartScreen({ dispatch, numResult }) {
  return (
    <div className="start">
      <h3>Welcome to ISAIAH Quiz</h3>
      <h4>{numResult} questions to test your knowlege</h4>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "active" })}
      >
        Start
      </button>
    </div>
  );
}

export default StartScreen;
