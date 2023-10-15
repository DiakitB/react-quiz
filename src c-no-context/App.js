import { useEffect, useReducer } from "react";
import Main from "./components/Main";
import Header from "./components/Header";
import Loader from "./components/Loder";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Finish from "./components/Finish";
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  currentQuestion: {},
};

const Questions = [
  {
    question: "Which year was Isaiah born ?",
    options: ["2006", "2007", "2010", "2011"],
    correctOption: 1,
    points: 10,
  },
  {
    question: "What is Isaiah's last name?",
    options: ["Brown", "Diakte", "DaiteKi", "Diakite"],
    correctOption: 3,
    points: 10,
  },
  {
    question: "How tall is Isaiah?",
    options: ["5'11", "6'2", "6'1", "5'10"],
    correctOption: 0,
    points: 10,
  },
  {
    question: "What is Isaiah's favorite color?",
    options: ["Green", "Red", "Blue", "Blac"],
    correctOption: 2,
    points: 10,
  },
  {
    question: "What is Isaih's mom name?",
    options: ["Melisa", "Karen", "Melissa", "Melessa"],
    correctOption: 2,
    points: 10,
  },
  {
    question: "How intelligent is Isaiah?",
    options: [
      "a bit intelligen",
      "intelligent",
      "very intelligent",
      " very very intelligent",
    ],
    correctOption: 3,
    points: 10,
  },
  {
    question: "When Isaiah sets his mind on something does he do it?",
    options: [
      "Some time",
      "Not really",
      "He always get the job done ",
      "procrastinate and lazy",
    ],
    correctOption: 2,
    points: 30,
  },
  {
    question: "In which state does Isaiah live at?",
    options: ["California", "New-York", "Ohio", "Idiana"],
    correctOption: 2,
    points: 20,
  },
  {
    question: "What was Isaiah's Primary School name?",
    options: [
      " town scholl",
      "Ecole b",
      "When we need to add styles",
      "Longfellow",
    ],
    correctOption: 3,
    points: 20,
  },
  {
    question: "What best describe Isaiah?",
    options: [
      "Very lazy ",
      "some time lazy some time hard worker",
      "I don't know it's hard to tell",
      "don't like to leave his comfort zone",
      "A go getter, very smart and goal oriented",
    ],
    correctOption: 4,
    points: 30,
  },
  {
    question: "What is 'Isaiah's race?",
    options: ["white", "Latino", "Human", "Black"],
    correctOption: 2,
    points: 30,
  },
  {
    question: "How much does Isaiah's dad loves him?",
    options: [
      "a bit ",
      "very much",
      "very very much like billion * billion * billion that much and more",
      "like him very much",
    ],
    correctOption: 2,
    points: 10,
  },
];
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

function App() {
  /// useReducer Hook
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, answer, index, points } = state;
  const numResult = questions.length;
  const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  /// useEffect Hook
  useEffect(function () {
    async function getQuestion() {
      try {
        // const res = await fetch("http://localhost:8000/questions");
        // const data = await res.json();
        // console.log(data);
        dispatch({ type: "data", payload: Questions });
      } catch (err) {
        dispatch({ type: "fail" });
      }
    }
    getQuestion();
  }, []);
  return (
    <div className="app">
      <Main>
        <Header />
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numResult={numResult} />
        )}
        {status === "actived" && (
          <>
            <Progress
              points={points}
              numResult={numResult}
              index={index}
              totalPoints={totalPoints}
            />
            <Question
              question={questions.at(index)}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              answer={answer}
              dispatch={dispatch}
              index={index}
              numResult={numResult}
            />
          </>
        )}
        {status === "finished" && (
          <Finish
            points={points}
            totalPoints={totalPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
