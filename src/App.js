import React, { useReducer, createContext, useContext } from "react";
import "./styles.css";

const activeState = [
  {
    season: "Spring",
    toggle: false,
    img:
      "https://images.unsplash.com/photo-1493589976221-c2357c31ad77?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
  },
  {
    season: "Summer",
    toggle: false,
    img:
      "https://images.unsplash.com/photo-1586500036065-bdaeac7a4feb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
  },
  {
    season: "Fall",
    toggle: false,
    img:
      "https://images.unsplash.com/photo-1508255139162-e1f7b7288ab7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    season: "Winter",
    toggle: false,
    img:
      "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80"
  }
];

const activeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE":
      const toggleTrue = (action) => {
        const falseAll = state.map((x) => Object.assign(x, { toggle: false }));
        const toggled = Object.assign(falseAll[action.payload], {
          toggle: true
        });
        const newState = state.map((x, index) =>
          index !== action.payload ? x : toggled
        );
        return newState;
      };
      const toggleFalse = (action) => {
        const falseAll = state.map((x) => Object.assign(x, { toggle: false }));
        const toggled = Object.assign(falseAll[action.payload], {
          toggle: false
        });
        const newState = state.map((x, index) =>
          index !== action.payload ? x : toggled
        );
        return newState;
      };
      return action.active ? toggleFalse(action) : toggleTrue(action);
    default:
      return state;
  }
};

const Context = createContext();

export default function App() {
  const [state, dispatch] = useReducer(activeReducer, activeState);

  return (
    <Context.Provider value={{ dispatch }}>
      <div className="container">
        {state.map((item, index) => (
          <Panels
            id={index}
            title={item.season}
            img={item.img}
            stat={item.toggle}
          />
        ))}
      </div>
    </Context.Provider>
  );
}

const Panels = ({ img, title, id, stat }) => {
  const context = useContext(Context);
  const { dispatch } = context;
  const clickHandler = (id) => {
    dispatch({ type: "TOGGLE", payload: id, active: stat });
  };

  return (
    <>
      <div
        onClick={() => clickHandler(id)}
        className={stat ? "panel active" : "panel"}
        style={{ backgroundImage: `url(${img})` }}
      >
        <h3>{title}</h3>
      </div>
    </>
  );
};
