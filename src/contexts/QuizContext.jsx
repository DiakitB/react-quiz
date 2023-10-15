import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();
///
///
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  currentQuestion: {},
};
/////

function reducer(state, action) {
  switch (action.type) {
    case "data":
      return { ...state, questions: action.payload, status: "ready" };
    case "fail":
      return { ...state, status: "error" };
    case "active":
      return { ...state, status: "actived" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      console.log(question);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return { ...state, status: "finished" };
    case "restart":
      return { initialState, questions: state.questions, status: "ready" };
    default:
      throw new Error("Unknown action");
  }
}

////
///
function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, answer, index, points } = state;
  const numResult = questions.length;
  const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  /// useEffect Hook
  useEffect(function () {
    async function getQuestion() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        console.log(data);
        dispatch({ type: "data", payload: data });
      } catch (err) {
        dispatch({ type: "fail" });
      }
    }
    getQuestion();
  }, []);
  return (
    <QuizContext.Provider
      value={{
        questions,
        numResult,
        totalPoints,
        status,
        answer,
        index,
        points,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("Quiz context have been used outside the Quiz provider");
  return context;
}

export { QuizProvider, useQuiz };
