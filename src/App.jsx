import { useReducer } from "react";
// complex state => useReducer

function App() {

  const intialState = {
    count: 0
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 };
      case "decrement":
        return { count: state.count - 1 };
      case "incrementByAmount":
        return { count: state.count + action.data };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, intialState)

  return (
    <div className="counter-app">
      <div className="counter-card">
        <span className="counter-label">Current Count</span>
        <h1 className="counter-value">{state.count}</h1>
        <div className="counter-actions">
          <button
            className="btn btn-decrement"
            onClick={() => dispatch({ type: "decrement" })}
          >
            − Decrement
          </button>
          <button
            className="btn btn-increment"
            onClick={() => dispatch({ type: "increment" })}
          >
            + Increment
          </button>
          <button
            className="btn btn-amount"
            onClick={() => dispatch({ type: "incrementByAmount", data: 5 })}
          >
            +5
          </button>
        </div>
      </div>
    </div>
  )
}

export default App